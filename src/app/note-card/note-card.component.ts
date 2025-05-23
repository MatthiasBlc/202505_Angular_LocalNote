import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title?: string;
  @Input() body?: string;
  @Input() link?: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', { static: false }) truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: false }) bodyText!: ElementRef<HTMLElement>;


  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const bodyTextEl = this.bodyText?.nativeElement;
    const truncatorEl = this.truncator?.nativeElement;

    if (bodyTextEl && truncatorEl) {
      const style = window.getComputedStyle(bodyTextEl);
      const viewableHeight = parseInt(style.getPropertyValue('height'), 10);

      if (bodyTextEl.scrollHeight > viewableHeight) {
        this.renderer.setStyle(truncatorEl, 'display', 'block');
      } else {
        this.renderer.setStyle(truncatorEl, 'display', 'none');
      }
    }
  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }

}
