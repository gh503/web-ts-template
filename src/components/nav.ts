import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/app-layout';
import '@vaadin/horizontal-layout';

@customElement('uu-nav')
export class Nav extends LitElement {

  protected override render() {
    return html`
  <vaadin-app-layout>
    <vaadin-horizontal-layout slot="navbar" class="h-m w-full justify-center gap-s">
      <a
        href="/"
        class="flex items-center px-m text-secondary font-medium"
        style="text-decoration: none"
      >
        主页
      </a>
      <a
        href="/news"
        class="flex items-center px-m text-secondary font-medium"
        style="text-decoration: none"
      >
        新闻
      </a>
      <a
        href="/forum"
        class="flex items-center px-m text-secondary font-medium"
        style="text-decoration: none"
      >
        论坛
      </a>
      <a
        href="/study"
        class="flex items-center px-m text-secondary font-medium"
        style="text-decoration: none"
      >
        学习
      </a>
      <a
        href="/fun"
        class="flex items-center px-m text-secondary font-medium"
        style="text-decoration: none"
      >
        娱乐
      </a>
      <a
        href="/about"
        class="flex items-center px-m text-secondary font-medium"
        style="text-decoration: none"
      >
        关于
      </a>
    </vaadin-horizontal-layout>
  </vaadin-app-layout>
    `;
  }
}