export const HINTS_PROMPT_PARTS = [
  // Hint 1: Simple Explanation
  `Provide a clear, plain-language explanation of the problem goal for '${'${title}'}' with relatable examples or analogies.`,

  // Hint 2: Relevant Data Structures or Algorithms
  `Given the problem '${'${title}'}', describe key data structures or algorithms useful for this problem and why they are applicable. Do not provide a solution.`,

  // Hint 3: Key Insight with Guiding Questions
  `What is the main insight or pattern needed to solve '${'${title}'}'? Ask open-ended questions that guide the user to the key idea without giving the answer.`,

  // Hint 4: Important Details and Edge Cases
  `For the problem '${'${title}'}', highlight tricky scenarios, constraints, performance considerations, and common pitfalls.`,

  // Hint 5: Next Steps and Suggestions
  `Based on '${'${title}'}', advise the user on what to try next. Provide a high-level approach or pseudocode without giving the full solution.`
];

export const REVEAL_ANSWER_PROMPT_TEMPLATE = `
You are a coding assistant.
Provide a complete and detailed optimal solution for the following coding problem in ${'${language}'}.
Your response must follow this exact format:

Approach:

Provide a clear, step-by-step explanation of the logic behind the optimal solution.
Explain why this approach is chosen and how it addresses the problem effectively.
Describe the key data structures or algorithms used and why they are suitable.
Include any important insights or patterns that help understand the solution.

Code:

Provide the complete ${'${language}'} implementation inside a scrollable code block.
Ensure the code is clean, well-formatted, and easy to read.

Time Complexity:

State the overall time complexity in Big O notation.
Provide a detailed explanation of how this complexity is derived.
Include reasoning about loops, recursion, or operations that impact runtime.

Space Complexity:

State the overall space complexity in Big O notation.
Explain how the space usage is calculated.
Discuss any auxiliary data structures or recursion stack space that affect memory usage.

Problem Title: ${'${title}'}

Problem Description:

${'${description}'}
`;

export const EXTENSION_ID_PLACEHOLDER = 'YOUR_EXTENSION_ID';