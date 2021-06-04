import {Component, Element, Event, Method, h, Host, Fragment, Prop} from '@stencil/core';
import {
  hideLazyLoadImages,
  afterSwipe,
  beforeSwipe,
  lazyLoadContent,
  hideAllRevealElements,
  showAllRevealElements
} from '@deckdeckgo/slide-utils';
/**
 * @slot title - An example of a custom slot
 * @slot content - Another example of a custom slot with a restricted list of usage - h1,h2,h3,section
 */
export class MyTemplate {
  async componentDidLoad() {
    await hideLazyLoadImages(this.el);
    this.slideDidLoad.emit();
  }
  beforeSwipe(enter, reveal) {
    return beforeSwipe(this.el, enter, reveal);
  }
  afterSwipe() {
    return afterSwipe();
  }
  lazyLoadContent() {
    return lazyLoadContent(this.el);
  }
  revealContent() {
    return showAllRevealElements(this.el);
  }
  hideContent() {
    return hideAllRevealElements(this.el);
  }
  render() {
    return h(
      Host,
      {class: {'deckgo-slide-container': true}},
      h(
        'div',
        {class: 'deckgo-slide'},
        h(
          'article',
          {id: 'webslides'},
          h(
            'section',
            {class: 'fullscreen bg-white'},
            h(
              'div',
              {class: 'card-50'},
              h('figure', null, h('img', {src: 'https://source.unsplash.com/ALtNa-uKy3M/', alt: 'Bonsai'})),
              h(
                'div',
                {class: 'flex-content'},
                h('h2', null, h('strong', null, h('slot', {name: 'title'}))),
                h('p', {class: 'text-intro'}, h('slot', {name: 'content'}))
              )
            )
          )
        ),
        this.renderDeckSlots()
      )
    );
  }
  /**
   * Slots used to propagate decks options.
   *
   * - notes: allow user to add notes for this slide (mandatory)
   * - header: clone a header on every slides (recommended)
   * - footer: clone a footer on every slides (recommended)
   * - background: replicate the same background on every slides (recommended if you do not provide any particular design)
   * - actions: can be use to add an action on the top right corner of a slide (optional)
   */
  renderDeckSlots() {
    return h(
      Fragment,
      null,
      h('slot', {name: 'notes'}),
      h('slot', {name: 'header'}),
      h('slot', {name: 'footer'}),
      h('slot', {name: 'background'}),
      h('slot', {name: 'actions'})
    );
  }
  static get is() {
    return 'my-template';
  }
  static get encapsulation() {
    return 'shadow';
  }
  static get originalStyleUrls() {
    return {
      $: ['my-template.scss']
    };
  }
  static get styleUrls() {
    return {
      $: ['my-template.css']
    };
  }
  static get properties() {
    return {
      value: {
        type: 'string',
        mutable: false,
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {}
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'An example of a custom property'
        },
        attribute: 'value',
        reflect: true
      }
    };
  }
  static get events() {
    return [
      {
        method: 'slideDidLoad',
        name: 'slideDidLoad',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: ''
        },
        complexType: {
          original: 'void',
          resolved: 'void',
          references: {}
        }
      }
    ];
  }
  static get methods() {
    return {
      beforeSwipe: {
        complexType: {
          signature: '(enter: boolean, reveal: boolean) => Promise<boolean>',
          parameters: [
            {
              tags: [],
              text: ''
            },
            {
              tags: [],
              text: ''
            }
          ],
          references: {
            Promise: {
              location: 'global'
            }
          },
          return: 'Promise<boolean>'
        },
        docs: {
          text: '',
          tags: []
        }
      },
      afterSwipe: {
        complexType: {
          signature: '() => Promise<void>',
          parameters: [],
          references: {
            Promise: {
              location: 'global'
            }
          },
          return: 'Promise<void>'
        },
        docs: {
          text: '',
          tags: []
        }
      },
      lazyLoadContent: {
        complexType: {
          signature: '() => Promise<void>',
          parameters: [],
          references: {
            Promise: {
              location: 'global'
            }
          },
          return: 'Promise<void>'
        },
        docs: {
          text: '',
          tags: []
        }
      },
      revealContent: {
        complexType: {
          signature: '() => Promise<void>',
          parameters: [],
          references: {
            Promise: {
              location: 'global'
            }
          },
          return: 'Promise<void>'
        },
        docs: {
          text: '',
          tags: []
        }
      },
      hideContent: {
        complexType: {
          signature: '() => Promise<void>',
          parameters: [],
          references: {
            Promise: {
              location: 'global'
            }
          },
          return: 'Promise<void>'
        },
        docs: {
          text: '',
          tags: []
        }
      }
    };
  }
  static get elementRef() {
    return 'el';
  }
}
