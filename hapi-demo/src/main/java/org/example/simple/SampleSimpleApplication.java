/*
 * Copyright 2012-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.example.simple;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.context.support.DefaultProfileValidationSupport;
import ca.uhn.fhir.context.support.IValidationSupport;
import ca.uhn.fhir.validation.ValidationOptions;
import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Configuration;
import java.io.FileNotFoundException;
import java.util.Objects;

@Configuration
// @EnableAutoConfiguration
// @ComponentScan
public class SampleSimpleApplication implements CommandLineRunner {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleSimpleApplication.class, args);
    }

    public boolean dummyMethod() {
        return true;
    }

    public void createAndValidatePerson() {
        // Creating an instance of resource
        var person = new Person();
        person.setActive(true);

        var nationalPassportId = person.addIdentifier();
        nationalPassportId.setValue("4503 664903");
        nationalPassportId.setSystem("https://aaa.com/a");

        var internationalPassportId = person.addIdentifier();
        internationalPassportId.setValue("9999 999999");
        internationalPassportId.setSystem("https://aaa.com/b");

        var name = person.addName();
        name.setUse(HumanName.NameUse.OFFICIAL);
        name.setFamily("Baranov");
        name.addGiven("Dmitry");
        name.addGiven("Alex");

        var phone = person.addTelecom();
        phone.setSystem(ContactPoint.ContactPointSystem.PHONE);
        phone.setValue("+79104301700");

        var email = person.addTelecom();
        email.setSystem(ContactPoint.ContactPointSystem.EMAIL);
        email.setValue("d.a.baranov@gmail.com");

        var path = "";

        var validator = new FhirValidatorR4();
        validator.validate(person, path, "https://example.org/fhir/StructureDefinition/CvSubject");
    }

    private void createAndValidatePatient() {
        var path = "c:\\dev\\simplifier\\dabaranov\\fhir-playground\\CvPatient.StructureDefinition.xml";
        var uri = "https://example.org/fhir/StructureDefinition/CvPatient";
        var patient = new Patient();
        var patientName = patient.addName();
        patientName.setFamily("Baranov");
        patientName.addGiven("Dmitry");
        patientName.addGiven("Alexander");
        patient.setActive(true);
        var telecom = patient.addTelecom();
        telecom.setSystem(ContactPoint.ContactPointSystem.PHONE);
        telecom.setValue("+79104301700");

        var snn = new Extension();
        snn.setUrl("https://example.org/fhir/StructureDefinition/CvSnn");
        var str = new StringType();
        str.setValue("111-111-111 11");
        snn.setValue(str);
        patient.addExtension(snn);

        var validator = new FhirValidatorR4();
        validator.validate(patient, path, uri);
    }

    private void createAndValidateVitalSigns() {
        var path = "C:\\dev\\simplifier\\dabaranov\\fhir-playground\\OutburnObservationVitalSigns.StructureDefinition.xml";
        var uri = "https://example.org/fhir/StructureDefinition/OutburnObservationVitalSigns";

        var observation = new Observation();
        observation.setStatus(Observation.ObservationStatus.REGISTERED);
        var observationCode = new CodeableConcept();
        var observationCoding = observationCode.addCoding();
        observationCoding.setSystem("https://outburn.co.il");
        observationCoding.setCode("000001");
        observation.setCode(observationCode);

        // Heart rate
        var componentPulse = new Observation.ObservationComponentComponent();
        componentPulse.setCode(new CodeableConcept());
        componentPulse.getCode().setText("Heart rate");
        componentPulse.getCode().addCoding();
        componentPulse.getCode().getCoding().get(0).setCode("8867-4");
        componentPulse.getCode().getCoding().get(0).setSystem("http://loinc.org");
        var pulseValue = new Quantity();
        pulseValue.setValue(60);
        pulseValue.setUnit("/min");
        componentPulse.setValue(pulseValue);
        observation.addComponent(componentPulse);

        var componentSaturation = new Observation.ObservationComponentComponent();
        componentSaturation.setCode(new CodeableConcept());
        componentSaturation.getCode().setText("Saturation");
        componentSaturation.getCode().addCoding();
        componentSaturation.getCode().getCoding().get(0).setCode("2708-6");
        componentSaturation.getCode().getCoding().get(0).setSystem("http://loinc.org");
        var saturationValue = new Quantity();
        saturationValue.setValue(99);
        saturationValue.setUnit("%");
        componentSaturation.setValue(saturationValue);
        observation.addComponent(componentSaturation);

        var validator = new FhirValidatorR4();
        validator.validate(observation, path, uri);
    }

    private void createAndValidatePatientEE() {
        var path = "c:\\dev\\simplifier\\ee-base\\Profiles\\StructureDefinition-EEBase-Patient.xml";
        var uri = "https://hl7.ee/fhir/StructureDefinition/EEBase-Patient";
        var patient = new Patient();
        var id1 = patient.addIdentifier();
        var id2 = patient.addIdentifier();
        var cc = new CodeableConcept();
        var coding = cc.addCoding();
        coding.setSystem("http://hl7.org/fhir/ValueSet/identifier-type");
        coding.setCode("MR");

        id1.setUse(Identifier.IdentifierUse.OFFICIAL);
        id1.setType(cc);
        id1.setSystem("https://hl7.ee/NamingSystem/ee-pid-id");
        id1.setValue("123");

        id2.setUse(Identifier.IdentifierUse.OFFICIAL);
        id2.setType(cc);
        id2.setValue("456");

        patient.setActive(true);

        var validator = new FhirValidatorR4();
        validator.validate(patient, path, uri);
    }

    // Simple example shows how a command line spring application can execute an
    // injected bean service. Also demonstrates how you can use @Value to inject
    // command line args ('--name=whatever') or application properties
    @Override
    public void run(String... args) {
        createAndValidateVitalSigns();
    }
}
