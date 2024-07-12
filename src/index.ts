import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import { HomeView } from './views/HomeView';

import './styles/global.css';
import './styles/login.css';

document.body.appendChild(new HomeView());
