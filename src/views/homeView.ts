import { html, LitElement } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';

import '@vaadin/app-layout';
import '@vaadin/tabs';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/select';
import '@vaadin/list-box';
import '@vaadin/item';

import { navigateToUrl } from '../utils/helper';

@customElement('home-view')
export class HomeView extends LitElement {

  protected override render() {
    return html`
  <vaadin-app-layout>
    <div class="content">
      <div class="sidebar">菜单内容</div>

      <div class="main-content" id="outlet"></div>

      <div class="extra-content">内容标题</div>
    </div>

    <footer class="footer">关联网站和备案信息</footer>
  </vaadin-app-layout>
    `;
  }
}
