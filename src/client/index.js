import 'babel-polyfill';
import { app, clearApp } from './js/app'
import { toDo, clearToDoList, toDoInit } from './js/toDo'


import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './media/logo.jpg'

export {
    app,
    clearApp,
    toDo,
    clearToDoList,
    toDoInit,
}