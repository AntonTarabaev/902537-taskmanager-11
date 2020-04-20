import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
