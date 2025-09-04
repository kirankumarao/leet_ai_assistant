const STORAGE_KEY = 'leetcode_revisions_data';

interface ProblemUsage {
  hints: number;
  solution: boolean;
}

interface StorageData {
  problems: {
    [key: string]: ProblemUsage;
  };
  revisionList: string[];
}

const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { problems: {}, revisionList: [] };
  } catch (e) {
    console.error("Failed to parse localStorage data", e);
    return { problems: {}, revisionList: [] };
  }
};

const setStorageData = (data: StorageData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to set localStorage data", e);
  }
};

const updateRevisionList = (problemTitle: string, data: StorageData) => {
  const usage = data.problems[problemTitle];
  // Check if problem meets the criteria for the revision list
  if (usage.hints >= 3 || usage.solution) {
    if (!data.revisionList.includes(problemTitle)) {
      data.revisionList.push(problemTitle);
    }
  }
};

export const trackUsage = (problemTitle: string, type: 'hint' | 'solution') => {
  const data = getStorageData();
  if (!data.problems[problemTitle]) {
    data.problems[problemTitle] = { hints: 0, solution: false };
  }

  if (type === 'hint') {
    data.problems[problemTitle].hints += 1;
  } else if (type === 'solution') {
    data.problems[problemTitle].solution = true;
  }
  
  updateRevisionList(problemTitle, data);
  setStorageData(data);
};

export const getRevisionList = (): string[] => {
  return getStorageData().revisionList;
};

export const markProblemAsDone = (problemTitle: string) => {
  const data = getStorageData();
  data.revisionList = data.revisionList.filter(title => title !== problemTitle);
  setStorageData(data);
};