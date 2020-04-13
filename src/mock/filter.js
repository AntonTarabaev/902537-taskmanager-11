const filterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

const calculateTasksCountByFilter = (tasks, filterName) => {
  let tasksCount = 0;

  switch (filterName) {
    case filterNames[0]:
      tasksCount = tasks.length;
      break;
    case filterNames[1]:
      tasksCount = tasks.reduce((acc, task) => {
        const isExpired = task.dueDate instanceof Date && task.dueDate < Date.now();
        return acc + (isExpired ? 1 : 0);
      }, 0);
      break;
    case filterNames[2]:
      const todayDate = new Date();
      tasksCount = tasks.reduce((acc, task) => {
        const isToday = task.dueDate instanceof Date && task.dueDate.getDate() === todayDate.getDate();
        return acc + (isToday ? 1 : 0);
      }, 0);
      break;
    case filterNames[3]:
      tasksCount = tasks.reduce((acc, task) => {
        return acc + (task.isFavorite ? 1 : 0);
      }, 0);
      break;
    case filterNames[4]:
      tasksCount = tasks.reduce((acc, task) => {
        const isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
        return acc + (isRepeatingTask ? 1 : 0);
      }, 0);
      break;
    case filterNames[5]:
      tasksCount = tasks.reduce((acc, task) => {
        return acc + (task.isArchive ? 1 : 0);
      }, 0);
      break;
  }

  return tasksCount;
};

export const generateFilters = (tasks) => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: calculateTasksCountByFilter(tasks, it),
    };
  });
};
