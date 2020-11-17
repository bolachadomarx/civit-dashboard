import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css'],
})
export class DragndropComponent implements OnInit {
  @Input() files: any[] = []
  @Output() filesChange = new EventEmitter<any[]>()
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  onFileDropped($event) {
    let validFiles = []
    let hasInvalid
    for (const file of $event) {
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        validFiles.push(file)
      } else {
        hasInvalid = true
      }
    }
    if (hasInvalid) {
      this.toastr.warning('Apenas arquivos PNG, JPG ou JPEG são aceitos')
    }
    this.prepareFilesList(validFiles)
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files)
  }

  deleteFile(index: number) {
    this.files.splice(index, 1)
  }

  prepareFilesList(files: any[]) {
    this.filesChange.emit(files)
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes'
    }
    const k = 1024
    const dm = decimals <= 0 ? 0 : decimals || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
}
