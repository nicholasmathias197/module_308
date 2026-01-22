// Exercise 7: Error Handling

// Task 1: Basic try/catch
// TODO: Wrap the following code in a try/catch block
// The code tries to access a property on undefined, which will throw an error
console.log("=== Task 1: Basic Try/Catch ===");
try {
    // TODO: Put this code inside the try block
    const obj = undefined;
    console.log(obj.name); // This will throw an error
} catch (error) {
    // TODO: Log the error message
    console.log("Error caught:", error.message);
}

// Task 2: Divide by zero check
// TODO: Create a function called safeDivide that takes two parameters: numerator and denominator
// If denominator is 0, throw an error with message "Cannot divide by zero"
// Otherwise, return numerator / denominator
// Wrap the function call in try/catch
console.log("\n=== Task 2: Safe Divide ===");

function safeDivide(numerator, denominator) {
    // TODO: Add validation and throw error if needed
    if (denominator === 0) {
        throw new Error("Cannot divide by zero");
    }
    return numerator / denominator;
}

// TODO: Test the function with try/catch
// Test with: safeDivide(10, 2) and safeDivide(10, 0)
try {
    console.log("10 / 2 =", safeDivide(10, 2));
    console.log("10 / 0 =", safeDivide(10, 0));
} catch (error) {
    console.log("Error caught:", error.message);
}

// Task 3: Validate course_id match
// TODO: Create a function called validateCourse that takes course and assignmentGroup
// If course.id !== assignmentGroup.course_id, throw an error
// Message: "Invalid input: assignment group does not belong to this course"
console.log("\n=== Task 3: Validate Course ===");

function validateCourse(course, assignmentGroup) {
    // TODO: Add validation logic
    if (course.id !== assignmentGroup.course_id) {
        throw new Error("Invalid input: assignment group does not belong to this course");
    }
    return true; // If validation passes
}

const course1 = { id: 101, name: "JavaScript" };
const assignmentGroup1 = { id: 1, course_id: 101 };
const assignmentGroup2 = { id: 2, course_id: 102 }; // Wrong course!

// TODO: Test with try/catch
// Test both assignmentGroup1 (should work) and assignmentGroup2 (should error)
try {
    validateCourse(course1, assignmentGroup1);
    console.log("Assignment Group 1 is valid for Course 1");
    validateCourse(course1, assignmentGroup2);
    console.log("Assignment Group 2 is valid for Course 1");
} catch (error) {
    console.log("Error caught:", error.message);
}

// Task 4: Type validation
// TODO: Create a function called calculatePercentage that validates input types
// Parameters: score, pointsPossible
// Throw error if either parameter is not a number
// Otherwise return (score / pointsPossible) * 100
console.log("\n=== Task 4: Type Validation ===");

function calculatePercentage(score, pointsPossible) {
    // TODO: Check if score and pointsPossible are numbers
    // Use typeof operator: typeof score !== "number"
    if (typeof score !== "number" || typeof pointsPossible !== "number") {
        throw new Error("Both score and pointsPossible must be numbers");
    }
    return (score / pointsPossible) * 100;
}

// TODO: Test with try/catch
// Test with: (85, 100), ("85", 100), (85, "100")
try {
    console.log("85 / 100 =", calculatePercentage(85, 100) + "%");
    console.log("'85' / 100 =", calculatePercentage("85", 100) + "%");
    console.log("85 / '100' =", calculatePercentage(85, "100") + "%");
} catch (error) {
    console.log("Error caught:", error.message);
}

// Task 5: Multiple validations
// TODO: Create a function called processAssignment that validates an assignment object
// Check: 1) assignment exists (not null/undefined)
//        2) assignment.points_possible exists and is a number
//        3) assignment.points_possible > 0
// Throw appropriate errors for each case
console.log("\n=== Task 5: Multiple Validations ===");

function processAssignment(assignment) {
    // TODO: Add multiple validation checks
    if (assignment == null) {
        throw new Error("Assignment is required");
    }
    if (typeof assignment.points_possible !== "number") {
        throw new Error("points_possible must be a number");
    }
    if (assignment.points_possible <= 0) {
        throw new Error("points_possible must be greater than zero");
    }
    return true; // If all validations pass
}
// TODO: Test with try/catch
// Test with: null, {}, { points_possible: "100" }, { points_possible: 0 }, { points_possible: 100 }
try {
    processAssignment(null);
} catch (error) {
    console.log("Error caught:", error.message);
}

try {
    processAssignment({});
} catch (error) {
    console.log("Error caught:", error.message);
}

try {
    processAssignment({ points_possible: "100" });
} catch (error) {
    console.log("Error caught:", error.message);
}

try {
    processAssignment({ points_possible: 0 });
} catch (error) {
    console.log("Error caught:", error.message);
}

try {
    processAssignment({ points_possible: 100 });
    console.log("Assignment is valid");
} catch (error) {
    console.log("Error caught:", error.message);
}

const assignmentsToTest = [
    null,
    {},
    { points_possible: "100" },
    { points_possible: 0 },
    { points_possible: 100 }
];

// TODO: Test with try/catch
// Test with: null, {}, { points_possible: "100" }, { points_possible: 0 }, { points_possible: 100 }
console.log("\n--- Array Test Approach ---");
assignmentsToTest.forEach((assignment, index) => {
    try {
        processAssignment(assignment);
        console.log(`Assignment ${index + 1}: Valid`);
    } catch (error) {
        console.log(`Assignment ${index + 1}: Error - ${error.message}`);
    }
});

// Task 6: Nested try/catch
// TODO: Create a function that processes multiple submissions
// Use try/catch inside a loop to continue processing even if one submission fails
console.log("\n=== Task 6: Continue on Error ===");

const submissions = [
    { learner_id: 1, score: 85, points: 100 },
    { learner_id: 2, score: 90, points: 0 },    // Invalid!
    { learner_id: 3, score: 75, points: 100 }
];

function processSubmissions(submissions) {
    const results = [];
    // TODO: Loop through submissions
    // For each one, try to calculate percentage (score/points * 100)
    // If error occurs, log it and continue to next submission
    // Add successful results to the results array
    for (let i = 0; i < submissions.length; i++) {
        try {
            const percentage = calculatePercentage(submissions[i].score, submissions[i].points);
            results.push({ learner_id: submissions[i].learner_id, percentage });
        } catch (error) {
            console.log(`Submission for learner ${submissions[i].learner_id} failed: ${error.message}`);
        }
    }
    return results;
}

// TODO: Call the function and log results
const processedResults = processSubmissions(submissions);
console.log("Processed Results:", processedResults);

// Task 7: Custom error messages
// TODO: Create a function that throws different errors based on what's wrong
console.log("\n=== Task 7: Custom Error Messages ===");

function validateSubmission(submission, assignment) {
    // TODO: Check multiple conditions and throw specific errors:
    // 1. If assignment.points_possible === 0: "Invalid assignment: points possible cannot be zero"
    // 2. If submission.score < 0: "Invalid score: cannot be negative"
    // 3. If submission.score > assignment.points_possible: "Invalid score: exceeds maximum points"
    if (assignment.points_possible === 0) {
        throw new Error("Invalid assignment: points possible cannot be zero");
    }
    if (submission.score < 0) {
        throw new Error("Invalid score: cannot be negative");
    }
    if (submission.score > assignment.points_possible) {
        throw new Error("Invalid score: exceeds maximum points");
    }
    return true; // If all validations pass
}

// TODO: Test with different invalid submissions
const testAssignment = { id: 1, points_possible: 100 };
const testSubmissions = [
    { learner_id: 1, score: -10 },   // Invalid: negative score
    { learner_id: 2, score: 150 },   // Invalid: exceeds max points
    { learner_id: 3, score: 85 }     // Valid
];

testSubmissions.forEach((submission) => {
    try {
        validateSubmission(submission, testAssignment);
        console.log(`Submission for learner ${submission.learner_id} is valid`);
    } catch (error) {
        console.log(`Submission for learner ${submission.learner_id} failed: ${error.message}`);
    }
});

// Task 8: Using finally
// TODO: Demonstrate the finally block
console.log("\n=== Task 8: Finally Block ===");

function demonstrateFinally() {
    try {
        console.log("Attempting operation...");
        // Simulate some operation that might fail
        throw new Error("Something went wrong!");
    } catch (error) {
        console.log("Error caught:", error.message);
    } finally {
        // TODO: Add finally block
        // This always runs, whether there was an error or not
        console.log("Finally block: cleanup complete");
    }
}

// TODO: Call the function
demonstrateFinally();