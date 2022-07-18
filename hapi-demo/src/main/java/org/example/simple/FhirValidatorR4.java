package org.example.simple;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.context.support.DefaultProfileValidationSupport;
import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.validation.ResultSeverityEnum;
import ca.uhn.fhir.validation.ValidationOptions;
import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
import org.hl7.fhir.instance.model.api.IBaseResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Provides validation of an in-memory resource instance against a profile
 */
public class FhirValidatorR4 {

    private final FhirContext fhirContext;
    private final IParser jsonParser;
    private final IParser xmlParser;
    private final FileValidationSupport fileValidationSupport;
    private final List<FhirValidatorMessage> messages = new ArrayList<>();

    public FhirValidatorR4() {
        // Registering STAX
        System.setProperty("javax.xml.stream.XMLInputFactory", "com.ctc.wstx.stax.WstxInputFactory");
        System.setProperty("javax.xml.stream.XMLOutputFactory", "com.ctc.wstx.stax.WstxOutputFactory");
        System.setProperty("javax.xml.stream.XMLEventFactory", "com.ctc.wstx.stax.WstxEventFactory");

        fhirContext = FhirContext.forR4();

        fileValidationSupport = new FileValidationSupport(fhirContext);

        jsonParser = fhirContext.newJsonParser();
        jsonParser.setPrettyPrint(true);

        xmlParser = fhirContext.newXmlParser();
        xmlParser.setPrettyPrint(true);
    }

    /**
     * Loads StructureDefinition from a local file
     * @param path Path to the file
     * @return StructureDefinition URL
     */
    public String loadStructureDefinitionFromFile(String path) {
        try {
            return fileValidationSupport.loadStructureDefinitionFromFile(path);
        }
        catch (IOException fnex) {
            throw new RuntimeException("Unexpected IOException: " + path, fnex);
        }
    }

    /**
     * Loads StructureDefinition from the Internet
     * @param url Resource URL
     * @return URL of loaded StructureDefinition
     */
    public String loadStructureDefinitionFromUrl(String url) {
        try {
            return fileValidationSupport.loadStructureDefinitionFromUrl(url);
        }
        catch (IOException ioex) {
            throw new RuntimeException("Unexpected IOException: " + url, ioex);
        }
    }

    /**
     * Provides validation of the resource agaist profile
     * @param resource In-memory resource instance
     * @param profileUri StructureDefinition URL
     */
    public void validate(IBaseResource resource, String profileUri) {

        messages.clear();

        Objects.requireNonNull(resource);

        var json = jsonParser.encodeResourceToString(resource);
        System.out.println(json);

        // Validate the object against custom FHIR profile
        // See https://www.youtube.com/watch?v=nIEK53ivNXY
        // See also https://groups.google.com/g/hapi-fhir/c/8Kf0Y6FWyrU
        // See also https://groups.google.com/g/hapi-fhir/c/BLacObKjtqw
        // See also https://groups.google.com/g/hapi-fhir/c/0hUGgBO2Xbo

        var defaultProfileValidationSupport = new DefaultProfileValidationSupport(fhirContext);
        var inMemoryTerminologyServerValidationSupport = new InMemoryTerminologyServerValidationSupport(fhirContext);
        var commonCodeSystemsTerminologyService = new CommonCodeSystemsTerminologyService(fhirContext);
        ValidationSupportChain validationSupportChain = new ValidationSupportChain(
                defaultProfileValidationSupport,
                fileValidationSupport,
                inMemoryTerminologyServerValidationSupport,
                commonCodeSystemsTerminologyService
        );

        var validator = fhirContext.newValidator();
        var instanceValidator = new FhirInstanceValidator(validationSupportChain);
        validator.registerValidatorModule(instanceValidator);

        var validationOptions = new ValidationOptions();
        resource.getMeta().addProfile(profileUri);

        var result = validator.validateWithResult(resource, validationOptions);
        // also can be converted to OperationOutcome:
        //      var operationOutcome = result.toOperationOutcome();
        for (var next : result.getMessages()) {
            var message = new FhirValidatorMessage();
            message.Severity = next.getSeverity();
            message.LocationString = next.getLocationString();
            message.Message = next.getMessage();
            this.messages.add(message);
        }
    }


    /**
     * Returns a list of validator messages
     * @return
     */
    public List<FhirValidatorMessage> getMessages() {
        return messages;
    }

    /**
     * Writes validation log to the console
     * @return
     */
    public String dump() {
        var sb = new StringBuilder();
        if (!hasErrors()) {
            sb.append("Congrats! No problems found!");
            sb.append("\r\n");
        }
        else {
            sb.append("No congrats :( Found some problems.");
            for (var message : messages) {
                sb.append(message.Severity + " : " + message.Message + " : " + message.LocationString);
                sb.append("\r\n");
            }
        }
        System.out.println(sb.toString());
        return sb.toString();
    }

    /**
     * Returns true if the validation has been not successful
     * @return
     */
    public boolean hasErrors() {
        for (var message : messages) {
            if (message.Severity == ResultSeverityEnum.ERROR ||
                    message.Severity == ResultSeverityEnum.FATAL) {
                return true;
            }
        }
        return false;
    }
}
