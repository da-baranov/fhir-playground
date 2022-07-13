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
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Date;

// @Configuration
// @EnableAutoConfiguration
// @ComponentScan
public class SampleSimpleApplication implements CommandLineRunner {

	// Simple example shows how a command line spring application can execute an
	// injected bean service. Also demonstrates how you can use @Value to inject
	// command line args ('--name=whatever') or application properties


	@Override
	public void run(String... args) {
		var patient = new Patient();
		var name = patient.addName();
		name.setFamily("Baranov");
		name.addGiven("Dmitry");
		name.addGiven("Alex");
		var phone = patient.addTelecom();
		phone.setValue("+79104301700");

		var ctx = FhirContext.forR4();
		var parser = ctx.newJsonParser();
		var json = parser.encodeResourceToString(patient);
		System.out.println(json);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SampleSimpleApplication.class, args);
	}
}
