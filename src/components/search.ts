import { css,html,LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/icons';

@customElement('uu-search')
export class Search extends LitElement {
    static override styles = css`
    :host {
      display: flex;
      align-items: center;
    }
    vaadin-text-field {
      flex: 1;
      margin-right: 8px;
    }
    `;

    protected override render() {
      return html`
      <vaadin-text-field placeholder="请输入..." @keydown="${(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            this.handleSearch();
          }
        }}"><vaadin-icon icon="vaadin:search" slot="prefix"></vaadin-icon>
      </vaadin-text-field>
      <vaadin-button @click="${this.handleSearch}">搜索</vaadin-button>
      `;
    }

    private handleSearch() {
      const input = this.shadowRoot?.querySelector('vaadin-text-field');
      if (input) {
        console.log('Search query:', input.value);
        // 在这里处理搜索逻辑
      }
    }
}
