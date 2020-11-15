import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css'],
})
export class DragndropComponent implements OnInit {
  @Input() files: any[] = []
  @Output() filesChange = new EventEmitter<any[]>()
  constructor() {}

  ngOnInit(): void {}
  onFileDropped($event) {
    this.prepareFilesList($event)
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files)
  }

  deleteFile(index: number) {
    this.files.splice(index, 1)
  }

  prepareFilesList(files: Array<any>) {
    console.log(files)

    for (const item of files) {
      item.progress = 0
      this.files.push(item)
      this.filesChange.emit(files)
    }
    this.uploadFilesSimulator(0)
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval)
            this.uploadFilesSimulator(index + 1)
          } else {
            this.files[index].progress += 5
          }
        }, 200)
      }
    }, 1000)
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
