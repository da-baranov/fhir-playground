package org.example.simple;

import ca.uhn.fhir.validation.ResultSeverityEnum;

/**
 * HAPI validation message wrapper
 */
public final class FhirValidatorMessage {

    /**
     * HAPI validation message severity
     */
    public ResultSeverityEnum Severity;

    /**
     * HAPI validation message location
     */
    public String LocationString;

    /**
     * HAPI validation message
     */
    public String Message;
}
