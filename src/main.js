import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import SiteMenuComponent, {MenuItem} from "./components/site-menu";
import FilterController from "./controllers/filter";
import TasksModel from "./models/tasks";
import {generateTasks} from "./mock/task";
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.NEW_TASK);
      boardController.createTask();
      break;
  }
});
