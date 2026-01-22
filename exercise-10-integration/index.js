// Exercise 10: SBA Integration - Putting It All Together

// This exercise combines everything you've learned!
// Complete the getLearnerData function to process student submissions

// Sample Course Data
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// Sample Assignment Group
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15", // Future assignment - should be excluded!
            points_possible: 500
        }
    ]
};

// Sample Learner Submissions
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07", // Late submission!
            score: 140
        }
    }
];

// TODO: Complete the getLearnerData function
// This function should return an array of objects like:
// [
//   {
//     id: 125,
//     avg: 0.985,  // weighted average
//     1: 0.94,     // assignment 1 percentage
//     2: 1.0       // assignment 2 percentage
//   },
//   ...
// ]

function getLearnerData(course, ag, submissions) {
    // TODO: Step 1 - Validate that ag.course_id matches course.id
    // If not, throw an error
    if (ag.course_id !== course.id) {
        throw new Error("Invalid input: assignment group does not belong to this course");
    }

    // TODO: Step 2 - Get current date to filter out future assignments
    const currentDate = new Date();

    // TODO: Step 3 - Helper function to check if assignment is due
    function isAssignmentDue(assignment) {
        // TODO: Return true if assignment.due_at <= currentDate
        const dueDate = new Date(assignment.due_at);
        return dueDate <= currentDate;
    }

    // TODO: Step 4 - Helper function to check if submission is late
    function isSubmissionLate(submission, assignment) {
        // TODO: Compare submission.submission.submitted_at with assignment.due_at
        const submittedDate = new Date(submission.submission.submitted_at);
        const dueDate = new Date(assignment.due_at);
        return submittedDate > dueDate;
    }

    // TODO: Step 5 - Helper function to calculate final score (with late penalty if needed)
    function calculateFinalScore(submission, assignment) {
        // TODO: If late, subtract 10% of points_possible from score
        let finalScore = submission.submission.score;
        
        // Skip if points_possible is 0 or invalid
        if (!assignment.points_possible || assignment.points_possible <= 0) {
            return 0;
        }
        
        if (isSubmissionLate(submission, assignment)) {
            const penalty = assignment.points_possible * 0.10;
            finalScore = Math.max(0, finalScore - penalty);
        }
        
        // Make sure score doesn't exceed points possible
        return Math.min(finalScore, assignment.points_possible);
    }

    // TODO: Step 6 - Helper function to find assignment by id
    function findAssignment(assignmentId) {
        // TODO: Search through ag.assignments to find matching id
        return ag.assignments.find(assignment => assignment.id === assignmentId);
    }

    // TODO: Step 7 - Get unique learner IDs from submissions
    function getUniqueLearnerIds(submissionsArray) {
        // TODO: Extract unique learner_id values
        const learnerIds = [];
        submissionsArray.forEach(submission => {
            if (!learnerIds.includes(submission.learner_id)) {
                learnerIds.push(submission.learner_id);
            }
        });
        return learnerIds;
    }

    // TODO: Step 8 - Main processing logic
    const results = [];
    const learnerIds = getUniqueLearnerIds(submissions);

    // TODO: For each learner...
    for (const learnerId of learnerIds) {
        // Create result object
        const result = {
            id: learnerId,
            avg: 0
        };

        let totalScore = 0;
        let totalPossible = 0;

        // TODO: Process each submission for this learner
        for (const submission of submissions) {
            if (submission.learner_id === learnerId) {
                // Find the assignment
                const assignment = findAssignment(submission.assignment_id);

                // TODO: Skip if assignment not found or not yet due
                if (!assignment || !isAssignmentDue(assignment)) {
                    continue;
                }

                // Skip if points_possible is 0 or invalid
                if (!assignment.points_possible || assignment.points_possible <= 0) {
                    continue;
                }

                // TODO: Calculate final score with late penalty
                const finalScore = calculateFinalScore(submission, assignment);

                // TODO: Calculate percentage
                const percentage = finalScore / assignment.points_possible;

                // TODO: Add to result object
                result[assignment.id] = parseFloat(percentage.toFixed(3));

                // TODO: Add to totals for weighted average
                totalScore += finalScore;
                totalPossible += assignment.points_possible;
            }
        }

        // TODO: Calculate weighted average
        if (totalPossible > 0) {
            result.avg = parseFloat((totalScore / totalPossible).toFixed(3));
        }

        results.push(result);
    }

    return results;
}

// Test the function
console.log("=== Exercise 10: Integration Test ===\n");

try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log("Results:");
    console.log(JSON.stringify(result, null, 2));
    
    console.log("\n=== Expected Output (approximately) ===");
    console.log(`[
  {
    "id": 125,
    "avg": 0.985,
    "1": 0.94,
    "2": 1.0
  },
  {
    "id": 132,
    "avg": 0.82,
    "1": 0.78,
    "2": 0.833...
  }
]`);
    
    console.log("\n✓ If your output is close to this, you're ready for the SBA!");
} catch (error) {
    console.log("Error:", error.message);
}

// TODO: After completing the function, test with edge cases:
// - What if points_possible is 0?
// - What if there are submissions for non-existent assignments?
// - What if course_id doesn't match?

console.log("\n=== Testing Edge Cases ===");

// Test 1: Course ID doesn't match
console.log("\n1. Testing mismatched course_id:");
const badCourse = { id: 999, name: "Wrong Course" };
try {
    const badResult = getLearnerData(badCourse, AssignmentGroup, LearnerSubmissions);
    console.log("Result should be empty:", badResult);
} catch (error) {
    console.log("Expected error:", error.message);
}

// Test 2: Assignment with 0 points possible
console.log("\n2. Testing assignment with 0 points possible:");
const AssignmentGroupZero = {
    ...AssignmentGroup,
    assignments: [
        { id: 1, name: "Zero Points", due_at: "2023-01-25", points_possible: 0 },
        { id: 2, name: "Normal Points", due_at: "2023-02-27", points_possible: 100 }
    ]
};

const SubmissionsZero = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 0 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 95 } }
];

try {
    const zeroResult = getLearnerData(CourseInfo, AssignmentGroupZero, SubmissionsZero);
    console.log("Result with zero-point assignment:");
    console.log(JSON.stringify(zeroResult, null, 2));
} catch (error) {
    console.log("Error:", error.message);
}

// Test 3: Submission for non-existent assignment
console.log("\n3. Testing submission for non-existent assignment:");
const SubmissionsInvalid = [
    { learner_id: 125, assignment_id: 999, submission: { submitted_at: "2023-01-25", score: 100 } },
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } }
];

try {
    const invalidResult = getLearnerData(CourseInfo, AssignmentGroup, SubmissionsInvalid);
    console.log("Result with invalid assignment ID:");
    console.log(JSON.stringify(invalidResult, null, 2));
} catch (error) {
    console.log("Error:", error.message);
}