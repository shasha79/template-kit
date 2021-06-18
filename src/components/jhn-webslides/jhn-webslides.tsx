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
 * @slot headline - Exhibit headline - h2
 * @slot title - Exhibit title - h1
 * @slot subtitle - Exhibit subtitle - h3
 * @slot image - Exhibit hero image - deckgo-lazy-img

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
          <div class="container">
            <div class="slide">
              <img
                src="https://s3.eu-central-1.amazonaws.com/jewish-heritage-tours/storymapjs/742d132034c90ea2dfff4fa9290d4f09/berlin-test1/_images/1.jpg"
                alt=""
                class="slide-image"
                slot="image"
              />
              <div class="slide-info">
                <h2 class="slide-info_headline" slot="headline">
                  A J-Story Virtual Exhibit
                </h2>
                <h1 class="slide-info_title" slot="title">
                  <strong>Jewish Women</strong> in the Century of Change
                </h1>
                <h3 class="slide-info_subtitle" slot="subtitle">
                  Optional Sub-Headline Text to Describe this Virtual Exhibit
                </h3>
                <div class="slide-info-footer">
                  <img class="slide-info-footer_logo" src="https://jhn.ngo/assets/img/logos/JHM.png" />
                  <img class="slide-info-footer_logo" src="https://jhn.ngo/assets/img/logos/JHM.png" />
                  <img class="slide-info-footer_logo" src="https://jhn.ngo/assets/img/logos/JHM.png" />
                </div>
              </div>
            </div>
          </div>
          {this.renderDeckSlots()}
        </div>
      </Host>
    );
  }

  /*

          <div class="center h-100 w-100">
              <div class="fl w-40 w-40-ns h-100">
                <img class="h-100" src="https://s3.eu-central-1.amazonaws.com/jewish-heritage-tours/storymapjs/742d132034c90ea2dfff4fa9290d4f09/berlin-test1/_images/1.jpg"/>
              </div>
              <div class="fl w3 w3-ns h-100 j-story-blue-background"></div>
              <div class="h-100 fl w-30 w-50-ns tc pl6 flex flex-column">
                <h2 class="j-story-title-1 f1 lh-copy tl fw3 ttu">A J-Story Virtual Exhibit</h2>
                <h1 class="j-story-title-2 f-headline lh-title tl fw5 mv4"><strong>Jewish Women</strong> in the Century of Change</h1>
                <h1 class="j-story-subtitle f1 lh-copy tl">Optional Sub-Headline Text to Describe this Virtual Exhibit</h1>
                <div class="tr right-0 bottom-0" style={{marginTop: 'auto'}}>                  
                  <img class="h-10 w-20" src="https://jhn.ngo/assets/img/logos/JHM.png"/>
                  <img class="h-10 w-20 ml5" src="https://jhn.ngo/assets/img/logos/JHM.png"/>
                  <img class="h-10 w-20 ml5" src="https://jhn.ngo/assets/img/logos/JHM.png"/>
                </div>
              </div>
          </div>          

<article id="webslides">
            <section class="fullscreen bg-white">
              <div class="card-50">
                <figure>
                  <slot name="image">
                    <img
                      src="https://s3.eu-central-1.amazonaws.com/jewish-heritage-tours/storymapjs/742d132034c90ea2dfff4fa9290d4f09/berlin-test1/_images/1.jpg"
                      alt="Bonsai"></img>
                  </slot>
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
 */

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
