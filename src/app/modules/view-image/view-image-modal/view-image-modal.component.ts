import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ModalService} from '../../../shared/components/modal/services/modal.service';

@Component({
  selector: 'app-view-image-modal',
  templateUrl: './view-image-modal.component.html',
  styleUrls: ['./view-image-modal.component.scss']
})
export class ViewImageModalComponent implements OnInit {

  @Input() image: any;

  constructor(private readonly sanitizer: DomSanitizer, private readonly modalService: ModalService) {
  }

  ngOnInit() {
  }

  getImageHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/x-png;base64,' + this.image);
  }

  close() {
    this.modalService.closeModal();
  }
}
