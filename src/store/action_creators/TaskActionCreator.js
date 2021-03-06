import {GET_TAGS_SUCCESS, GET_TAGS_ERROR, CHANGE_TASK_STATUS_SUCCESS, CHANGE_TASK_STATUS_ERROR, ADD_TASK_SUCCESS, ADD_PROJECT_ERROR, ADD_TASK_ERROR} from '../ActionTypes';
import {getTags, changeTaskStatus, addTask} from '../../realm/TaskRealm';

export const showProjectTasksScreen = (projectId) => {
  return (dispatch) => {
    getTags(projectId)
      .then(tags => {
        dispatch({ type: GET_TAGS_SUCCESS, tags});
      })
      .catch(error => {
        dispatch({ type: GET_TAGS_ERROR, error});
      })
  }
}

export const taskSwitchChanged = (projectId, taskId, newValue) => {
  return (dispatch) => {
    changeTaskStatus(taskId, projectId, newValue)
      .then(newTags => {
        dispatch({type: CHANGE_TASK_STATUS_SUCCESS, newTags});
      })
      .catch(error => {
        dispatch({type: CHANGE_TASK_STATUS_ERROR, error});
      })
  }
}

export const addTaskButtonTapped = (newTask) => {
  const task = {
    title: newTask.title,
    deadline: newTask.deadline
  }
  return (dispatch) => {
    addTask(newTask.projectId, newTask.tagId, task, newTask.tagTitle)
      .then(newTags => {
        dispatch({ type: ADD_TASK_SUCCESS, newTags});
      })
      .catch(error => {
        dispatch({ type: ADD_TASK_ERROR, error});
      })
  }
}