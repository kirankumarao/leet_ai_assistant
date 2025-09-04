export interface ProblemDetails {
  title: string;
  description: string;
}

export const getProblemDetails = (): ProblemDetails | null => {
  try {
    const titleElement = document.querySelector('div.flex.items-start.justify-between > div > a');
    const descriptionElement = document.querySelector('div.content-with-padding > div');

    if (!titleElement || !descriptionElement) {
      return null;
    }

    const title = titleElement.textContent?.trim() || '';
    const description = descriptionElement.textContent?.trim() || '';

    if (!title || !description) {
      return null;
    }

    return { title, description };
  } catch (error) {
    console.error("Failed to parse LeetCode page:", error);
    return null;
  }
};