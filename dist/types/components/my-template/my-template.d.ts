import {DeckdeckgoSlide} from '@deckdeckgo/slide-utils';
/**
 * @slot title - An example of a custom slot
 * @slot content - Another example of a custom slot with a restricted list of usage - h1,h2,h3,section
 */
export declare class MyTemplate implements DeckdeckgoSlide {
  private el;
  private slideDidLoad;
  /**
   * An example of a custom property
   */
  value: string;
  componentDidLoad(): Promise<void>;
  beforeSwipe(enter: boolean, reveal: boolean): Promise<boolean>;
  afterSwipe(): Promise<void>;
  lazyLoadContent(): Promise<void>;
  revealContent(): Promise<void>;
  hideContent(): Promise<void>;
  render(): any;
  /**
   * Slots used to propagate decks options.
   *
   * - notes: allow user to add notes for this slide (mandatory)
   * - header: clone a header on every slides (recommended)
   * - footer: clone a footer on every slides (recommended)
   * - background: replicate the same background on every slides (recommended if you do not provide any particular design)
   * - actions: can be use to add an action on the top right corner of a slide (optional)
   */
  private renderDeckSlots;
}
