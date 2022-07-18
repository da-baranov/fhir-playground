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

import org.hl7.fhir.r4.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Configuration;
import java.util.Calendar;

@Configuration
// @EnableAutoConfiguration
// @ComponentScan
// http://hl7.org/fhir/vitalsigns.html
public class SampleSimpleApplication implements CommandLineRunner {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleSimpleApplication.class, args);
    }

    public Observation createValidBatteryObservation() {
        // An observation
        var observation = new Observation();

        // Observation status
        observation.setStatus(Observation.ObservationStatus.REGISTERED);

        // Observation code
        var observationCode = new CodeableConcept();
        var observationCoding = observationCode.addCoding();
        observationCoding.setSystem("https://outburn.co.il");
        observationCoding.setCode("000001");
        observation.setCode(observationCode);

        // Date and time of observation (with time zone)
        observation.setEffective(new InstantType(Calendar.getInstance()));

        // Heart rate (pulse) component
        var componentPulse = new Observation.ObservationComponentComponent();
        componentPulse.setCode(new CodeableConcept());
        componentPulse.getCode().setText("Heart rate");
        componentPulse.getCode().addCoding();
        componentPulse.getCode().getCoding().get(0).setCode("8867-4");
        componentPulse.getCode().getCoding().get(0).setSystem("http://loinc.org");
        var pulseValue = new Quantity();
        pulseValue.setValue(-1);
        pulseValue.setUnit("/min");
        componentPulse.setValue(pulseValue);
        observation.addComponent(componentPulse);

        // Saturation (blood) component
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

        return observation;
    }

    public Observation createValidPulseObservation() {
        var observation = new Observation();

        // Fixed code
        observation.setCode(new CodeableConcept());
        var coding = observation.getCode().addCoding();
        coding.setSystem("http://loinc.org");
        coding.setCode("8867-4");

        // Fixed category
        observation.addCategory(new CodeableConcept());
        var categoryCode = observation.getCategory().get(0).addCoding();
        categoryCode.setSystem("http://terminology.hl7.org/CodeSystem/observation-category");
        categoryCode.setCode("vital-signs");

        // Patient is required
        var patientReference = new Reference();
        patientReference.setType("Patient");
        patientReference.setIdentifier(new Identifier().setSystem("urn:oid:1.2.3.4").setValue("123-123"));
        patientReference.setDisplay("Dmitry Baranov");
        observation.setSubject(patientReference);

        // Status is required
        observation.setStatus(Observation.ObservationStatus.REGISTERED);

        // Value is required, and value unit must be present in a valueset
        var value = new Quantity();
        value.setValue(60);
        value.setSystem("http://unitsofmeasure.org");
        value.setUnit("beats/min");
        value.setCode("/min");
        observation.setValue(value);

        // Left shoulder (body site) = 91775009
        // Right shoulder (body site) = 91774008
        // Left wrist = 5951000
        // Right wrist = 9736006
        var bodySite = new CodeableConcept();
        var bodySiteCoding = bodySite.addCoding();
        bodySiteCoding.setSystem("http://snomed.info/sct");
        bodySiteCoding.setCode("9736006");
        observation.setBodySite(bodySite);

        return observation;
    }

    public Observation createValidBloodOxygenSaturationObservation() {
        var observation = new Observation();

        // Fixed code
        observation.setCode(new CodeableConcept());
        var coding = observation.getCode().addCoding();
        coding.setSystem("http://loinc.org");
        coding.setCode("2708-6");

        // Fixed category
        observation.addCategory(new CodeableConcept());
        var categoryCode = observation.getCategory().get(0).addCoding();
        categoryCode.setSystem("http://terminology.hl7.org/CodeSystem/observation-category");
        categoryCode.setCode("vital-signs");

        // Patient is required
        var patientReference = new Reference();
        patientReference.setType("Patient");
        patientReference.setReference("Patient/123");
        patientReference.setIdentifier(new Identifier().setSystem("urn:oid:1.2.3.4").setValue("123-123"));
        patientReference.setDisplay("Dmitry Baranov");
        observation.setSubject(patientReference);

        // Status is required
        observation.setStatus(Observation.ObservationStatus.REGISTERED);

        // Value is required, and value unit must be present in a valueset
        var value = new Quantity();
        value.setValue(99);
        value.setSystem("http://unitsofmeasure.org");
        value.setUnit("%");
        value.setCode("%");
        observation.setValue(value);

        return observation;
    }

    private void createAndValidatePulseObservation()
    {
        var observation = createValidPulseObservation();

        var validator = new FhirValidatorR4();
        var url = validator.loadStructureDefinitionFromFile("C:\\dev\\simplifier\\dabaranov\\fhir-playground\\OutburnObservationPulse.StructureDefinition.xml ");
        validator.validate(observation, url);

        validator.dump();
    }

    private void createAndValidateBloodOxygenSaturationObservation()
    {
        var observation = createValidBloodOxygenSaturationObservation();

        var validator = new FhirValidatorR4();
        var url = validator.loadStructureDefinitionFromFile("C:\\dev\\simplifier\\dabaranov\\fhir-playground\\OutburnObservationSaturation.StructureDefinition.xml");
        validator.validate(observation, url);

        validator.dump();
    }

    private void createAndValidateVitalSignsBatteryObservation() {

        var observation = createValidBatteryObservation();

        var validator = new FhirValidatorR4();
        validator.loadStructureDefinitionFromFile(Constants.OBSERVATION_PROFILE_LOCAL_PATH);
        validator.validate(observation, Constants.OBSERVATION_PROFILE_URI);

        validator.dump();
    }

    // Simple example shows how a command line spring application can execute an
    // injected bean service. Also demonstrates how you can use @Value to inject
    // command line args ('--name=whatever') or application properties
    @Override
    public void run(String... args) {

        createAndValidateBloodOxygenSaturationObservation();
    }
}
