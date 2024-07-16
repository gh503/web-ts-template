import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/button';

import { navigateToUrl } from '../utils/helper';

@customElement('about-view')
export class AboutView extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #f9f9f9;
    }
    h1 {
      color: #333;
    }
  `;

  protected override render() {
    return html`
      <div>
        <h1>About View</h1>
        <p>This is the about page.</p>
        <vaadin-button @click="${() => navigateToUrl('/')}">Go to Home</vaadin-button>
      </div>
    `;
  }
}
