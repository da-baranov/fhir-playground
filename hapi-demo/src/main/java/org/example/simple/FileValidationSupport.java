package org.example.simple;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.context.support.IValidationSupport;
import ca.uhn.fhir.parser.IParser;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.StructureDefinition;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class FileValidationSupport implements IValidationSupport {

    private final FhirContext fhirContext;
    private final IParser xmlParser;

    private final HashMap<String, StructureDefinition> structureDefinitions = new HashMap<String, StructureDefinition>();

    public FileValidationSupport(FhirContext fhirContext) {
        if (fhirContext == null) {
            throw new IllegalArgumentException("fhirContext");
        }
        this.fhirContext = fhirContext;
        this.xmlParser = this.fhirContext.newXmlParser();
    }

    public String loadStructureDefinitionFromFile(String path) throws FileNotFoundException {
        var structureDefinition = (StructureDefinition) xmlParser.parseResource(new FileInputStream(path));
        var url = structureDefinition.getUrl();
        this.structureDefinitions.put(url, structureDefinition);
        return url;
    }

    @Override
    public <T extends IBaseResource> List<T> fetchAllStructureDefinitions() {
        var list = new ArrayList<T>();
        for (var sd : this.structureDefinitions.values()) {
            list.add((T) sd);
        }
        return list;
    }

    @Override
    public IBaseResource fetchStructureDefinition(String theUrl) {
        if (structureDefinitions.containsKey(theUrl)) {
            return structureDefinitions.get(theUrl);
        }
        return null;
    }

    @Override
    public FhirContext getFhirContext() {
        return fhirContext;
    }
}
