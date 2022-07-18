package org.example.simple;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.context.support.DefaultProfileValidationSupport;
import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.validation.ValidationOptions;
import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
import org.hl7.fhir.instance.model.api.IBaseResource;

import java.io.FileNotFoundException;
import java.util.Objects;

public class FhirValidatorR4 {

    private final FhirContext fhirContext;
    private final IParser jsonParser;
    private final IParser xmlParser;
    private final FileValidationSupport fileValidationSupport;

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

    public void validate(IBaseResource resource, String pathToStructureDefinition, String profileUri) {

        Objects.requireNonNull(resource);
        Objects.requireNonNull(pathToStructureDefinition);

        var json = jsonParser.encodeResourceToString(resource);
        System.out.println(json);

        // Validate the object against custom FHIR profile
        // See https://www.youtube.com/watch?v=nIEK53ivNXY
        // See also https://groups.google.com/g/hapi-fhir/c/8Kf0Y6FWyrU
        // See also https://groups.google.com/g/hapi-fhir/c/BLacObKjtqw
        // See also https://groups.google.com/g/hapi-fhir/c/0hUGgBO2Xbo

        try {
            fileValidationSupport.loadStructureDefinitionFromFile(pathToStructureDefinition);
        } catch (FileNotFoundException fnex) {
            throw new RuntimeException("File " + pathToStructureDefinition + " not found", fnex);
        }

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
            System.out.println(next.getSeverity() + " : " + next.getLocationString() + " : " + next.getMessage());
        }
    }
}
