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
import ca.uhn.fhir.i18n.Msg;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.client.api.ServerValidationModeEnum;
import ca.uhn.fhir.rest.server.exceptions.BaseServerResponseException;
import ca.uhn.fhir.validation.ValidationOptions;
import org.hl7.fhir.common.hapi.validation.support.CommonCodeSystemsTerminologyService;
import org.hl7.fhir.common.hapi.validation.support.InMemoryTerminologyServerValidationSupport;
import org.hl7.fhir.common.hapi.validation.support.ValidationSupportChain;
import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Struct;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

// @Configuration
// @EnableAutoConfiguration
// @ComponentScan
public class SampleSimpleApplication implements CommandLineRunner {

	private class FileValidationSupport implements IValidationSupport {

		public FileValidationSupport(FhirContext ctx)
		{
			myCtx = ctx;
		}
		private FhirContext myCtx = FhirContext.forR4();

		@Override
		public <T extends IBaseResource> List<T> fetchAllStructureDefinitions() {
			var xmlParser = myCtx.newXmlParser();
			StructureDefinition structureDefinition = null;
			try {
				structureDefinition = (StructureDefinition) xmlParser.parseResource(new FileInputStream("c:/dev/simplifier/dabaranov/fhir-playground/CvSubject.StructureDefinition.xml"));
			}
			catch (FileNotFoundException fnfex) {

			}
			List<T> list = new ArrayList<T>();
			T z = (T)structureDefinition;
			list.add(z);
			return list;
		}

		@Override
		public IBaseResource fetchStructureDefinition(String theUrl) {
			var xmlParser = myCtx.newXmlParser();
			StructureDefinition structureDefinition = null;
			try {
				structureDefinition = (StructureDefinition) xmlParser.parseResource(new FileInputStream("c:/dev/simplifier/dabaranov/fhir-playground/CvSubject.StructureDefinition.xml"));
			}
			catch (FileNotFoundException fnfex) {

			}
			return structureDefinition;
		}

		@Override
		public FhirContext getFhirContext() {
			return myCtx;
		}
	}

	// Simple example shows how a command line spring application can execute an
	// injected bean service. Also demonstrates how you can use @Value to inject
	// command line args ('--name=whatever') or application properties
	@Override
	public void run(String... args) {
		// Register STAX
		System.setProperty("javax.xml.stream.XMLInputFactory", "com.ctc.wstx.stax.WstxInputFactory");
		System.setProperty("javax.xml.stream.XMLOutputFactory", "com.ctc.wstx.stax.WstxOutputFactory");
		System.setProperty("javax.xml.stream.XMLEventFactory", "com.ctc.wstx.stax.WstxEventFactory");

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

		// Converting the object to JSON
		var ctx = FhirContext.forR4();
		var parser = ctx.newJsonParser();
		var xmlParser = ctx.newXmlParser();
		var json = parser.encodeResourceToString(person);
		System.out.println(json);

		// Validating the object against custom FHIR profile
		// Good video on https://www.youtube.com/watch?v=nIEK53ivNXY
		// See also https://groups.google.com/g/hapi-fhir/c/8Kf0Y6FWyrU
		// See also https://groups.google.com/g/hapi-fhir/c/BLacObKjtqw
		// See also https://groups.google.com/g/hapi-fhir/c/0hUGgBO2Xbo

		var fileValidationSupport = new FileValidationSupport(ctx);
		var defaultProfileValidationSupport = new DefaultProfileValidationSupport(ctx);
		var inMemoryTerminologyServerValidationSupport = new InMemoryTerminologyServerValidationSupport(ctx);
		var commonCodeSystemsTerminologyService = new CommonCodeSystemsTerminologyService(ctx);
		ValidationSupportChain validationSupportChain = new ValidationSupportChain(
				defaultProfileValidationSupport,
				fileValidationSupport
				//inMemoryTerminologyServerValidationSupport,
				//commonCodeSystemsTerminologyService
		);

		var validator = ctx.newValidator();
		var instanceValidator = new FhirInstanceValidator(validationSupportChain);
		validator.registerValidatorModule(instanceValidator);

		var validationOptions = new ValidationOptions();
		// validationOptions.addProfile("https://example.org/fhir/StructureDefinition/CvSubject");
		person.getMeta().addProfile("https://example.org/fhir/StructureDefinition/CvSubject");

		var result = validator.validateWithResult(person, validationOptions);
		var operationOutcome = result.toOperationOutcome();
		for (var next : result.getMessages()) {
			System.out.println(next.getLocationString() + " " + next.getMessage());
		}
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SampleSimpleApplication.class, args);
	}
}
