

// services/slotService.js
const { mySqlPool } = require("../config/db");

/**
 * Creates time slots for a doctor between start and end time
 * @param {number} doctorId - ID of the doctor
 * @param {string} startTime - Format 'HH:MM:SS'
 * @param {string} endTime - Format 'HH:MM:SS'
 * @param {number} slotDuration - Duration in minutes (default: 40)
 * @returns {Promise<boolean>} - Returns true if slots created successfully
 */
const createSlotsForDoctor = async (doctorId, startTime, endTime, slotDuration = 40) => {
    try {
        // Convert time strings to Date objects
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        
        // Calculate total minutes
        const totalMinutes = (end - start) / (1000 * 60);
        
        // Validate time range
        if (totalMinutes <= 0) {
            throw new Error("End time must be after start time");
        }
        
        // Calculate number of slots
        const numberOfSlots = Math.floor(totalMinutes / slotDuration);
        
        if (numberOfSlots === 0) {
            throw new Error("No valid slots can be created with the given time range");
        }
        
        // Generate slots
        const slots = [];
        let currentTime = new Date(start);
        
        for (let i = 0; i < numberOfSlots; i++) {
            const slotStart = new Date(currentTime);
            const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
            
            slots.push([
                slotStart.toTimeString().substring(0, 8), // Format as HH:MM:SS
                slotEnd.toTimeString().substring(0, 8),
                'available', // Default status
                doctorId
            ]);
            
            currentTime = slotEnd;
        }
        
        // Batch insert slots
        await mySqlPool.query(
            "INSERT INTO slote (start_time, end_time, status, doctor_id) VALUES ?",
            [slots]
        );
        
        console.log(`Created ${slots.length} slots for doctor ${doctorId}`.bgGreen);
        return true;
        
    } catch (error) {
        console.error(`Error in createSlotsForDoctor: ${error.message}`.bgRed);
        throw error; // Re-throw to be handled by the caller
    }
}

exports.createSlotsForDoctor = createSlotsForDoctor;




