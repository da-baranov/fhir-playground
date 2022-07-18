package org.example.simple;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ObservationProfilingTest extends BaseTest {

    private final FhirValidatorR4 validator;

    private String URI_BATTERY;
    private String URI_PULSE;
    private String URI_SATURATION;
    /**
     * Constructor
     */
    public ObservationProfilingTest() {
        validator = new FhirValidatorR4();
        URI_BATTERY = validator.loadStructureDefinitionFromUrl(Constants.OBSERVATION_BATTERY_PROFILE_URL);
        URI_PULSE = validator.loadStructureDefinitionFromUrl(Constants.OBSERVATION_PULSE_PROFILE_URL);
        URI_SATURATION = validator.loadStructureDefinitionFromUrl(Constants.OBSERVATION_SATURATION_PROFILE_URL);
    }

    /**
     * Testing a valid battery (pulse+oxygen saturation) observation
     */
    @Test
    public void validVitalSignsTest() {
        var validObservation = sampleSimpleApplication.createValidBatteryObservation();

        validator.validate(validObservation, URI_BATTERY);
        validator.dump();

        assertTrue(!validator.hasErrors(), "Test of invalid observation passed.");
    }

    /**
     * Testing an invalid battery (pulse+oxygen) observation with a missing required component
     */
    @Test
    public void invalidVitalSigns1Test() {
        var invalidObservation = sampleSimpleApplication.createValidBatteryObservation();
        // Remove required component
        invalidObservation.getComponent().remove(1);

        validator.validate(invalidObservation, URI_BATTERY);
        validator.dump();

        assertTrue(validator.hasErrors(), "Test of invalid observation passed.");
    }

    /**
     * Testing an invalid battery (pulse+observation) observation with missing value
     */
    @Test
    public void invalidVitalSigns2Test() {
        var invalidObservation = sampleSimpleApplication.createValidBatteryObservation();
        // Remove value
        invalidObservation.getComponent().get(1).setValue(null);

        validator.validate(invalidObservation, URI_BATTERY);
        var messages = validator.dump();

        assertTrue(validator.hasErrors(), "Test of invalid observation passed.");
    }

    /**
     * Testing an invalid battery (pulse+observation) observation with invalid component LOINC code
     */
    @Test
    public void invalidVitalSigns3Test() {
        var invalidObservation = sampleSimpleApplication.createValidBatteryObservation();
        // Set invalid observation code for Heart rate
        invalidObservation.getComponent().get(0).getCode().getCoding().get(0).setCode("00000-0");

        validator.validate(invalidObservation, URI_BATTERY);
        var messages = validator.dump();

        assertTrue(validator.hasErrors(), "Test of invalid observation passed.");
    }

    @Test
    public void testBloodOxygenSaturationObservation() {
        var validObservation = sampleSimpleApplication.createValidBloodOxygenSaturationObservation();

        validator.validate(validObservation, URI_SATURATION);

        var messages = validator.dump();
        assertFalse(validator.hasErrors(), "Test of valid observation passed.");
    }

    @Test
    public void testInvalidBloodOxygenSaturationObservation() {
        var invalidObservation = sampleSimpleApplication.createValidBloodOxygenSaturationObservation();
        invalidObservation.getCode().getCoding().get(0).setCode("00000-0");

        validator.validate(invalidObservation, URI_SATURATION);

        var messages = validator.dump();
        assertTrue(validator.hasErrors(), "Test of invalid observation passed.");
    }

    @Test
    public void testPulseObservation() {
        var validObservation = sampleSimpleApplication.createValidPulseObservation();

        validator.validate(validObservation, URI_PULSE);

        var messages = validator.dump();
        assertFalse(validator.hasErrors(), "Test of valid observation passed.");
    }

    @Test
    public void testInvalidPulseObservation() {
        var invalidObservation = sampleSimpleApplication.createValidPulseObservation();
        invalidObservation.getCode().getCoding().get(0).setCode("00000-0");

        validator.validate(invalidObservation, URI_PULSE);

        var messages = validator.dump();
        assertTrue(validator.hasErrors(), "Test of invalid observation passed.");
    }
}
