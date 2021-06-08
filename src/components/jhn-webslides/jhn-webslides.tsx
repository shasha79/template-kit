import {Component, Element, Event, EventEmitter, Method, h, Host, Fragment, Prop} from '@stencil/core';

import {
  DeckdeckgoSlide,
  hideLazyLoadImages,
  afterSwipe,
  beforeSwipe,
  lazyLoadContent,
  hideAllRevealElements,
  showAllRevealElements
} from '@deckdeckgo/slide-utils';

/**
 * @slot title - An example of a custom slot
 * @slot content - Another example of a custom slot with a restricted list of usage - section
 * @slot image - Another example of a custom slot with a restricted list of usage - deckgo-lazy-img

 */
@Component({
  tag: 'jhn-webslides',
  styleUrl: 'jhn-webslides.scss',
  shadow: true
})
export class MyTemplate implements DeckdeckgoSlide {
  @Element() private el: HTMLElement;

  @Event() private slideDidLoad: EventEmitter<void>;

  /**
   * An example of a custom property
   */
  @Prop({reflect: true})
  value: string;

  async componentDidLoad() {
    await hideLazyLoadImages(this.el);

    this.slideDidLoad.emit();
  }

  @Method()
  beforeSwipe(enter: boolean, reveal: boolean): Promise<boolean> {
    return beforeSwipe(this.el, enter, reveal);
  }

  @Method()
  afterSwipe(): Promise<void> {
    return afterSwipe();
  }

  @Method()
  lazyLoadContent(): Promise<void> {
    return lazyLoadContent(this.el);
  }

  @Method()
  revealContent(): Promise<void> {
    return showAllRevealElements(this.el);
  }

  @Method()
  hideContent(): Promise<void> {
    return hideAllRevealElements(this.el);
  }

  render() {
    return (
      <Host class={{'deckgo-slide-container': true}}>
        <div class="deckgo-slide">
          <article id="webslides">
            <section class="fullscreen bg-white">
              <div class="card-50">
                <figure>
                  <img
                    src="https://s3.eu-central-1.amazonaws.com/jewish-heritage-tours/storymapjs/742d132034c90ea2dfff4fa9290d4f09/berlin-test1/_images/1.jpg"
                    alt="Bonsai">
                    <slot name="image"></slot>
                  </img>
                </figure>
                <div class="flex-content">
                  <h2>
                    <strong>
                      <slot name="title"></slot>
                    </strong>
                  </h2>
                  <p class="text-intro">
                    <slot name="content"></slot>
                  </p>
                </div>
              </div>
            </section>
          </article>
          {this.renderDeckSlots()}
        </div>
      </Host>
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
  private renderDeckSlots() {
    return (
      <Fragment>
        <slot name="notes"></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <slot name="background"></slot>
        <slot name="actions"></slot>
      </Fragment>
    );
  }
}
