import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as CKEditor from "@ckeditor/ckeditor5-angular";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/tr";
import { ProjelerService } from "../../../services/projeler/projeler.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

export const _filePathToName = (path: string) => {
  const startIndex =
    path.indexOf("\\") >= 0 ? path.lastIndexOf("\\") : path.lastIndexOf("/");
  let filename = path.substring(startIndex);
  if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
    filename = filename.substring(1);
  }
  return filename;
};

@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"],
})
export class CreateProjectComponent implements OnInit {
  selectedFileName: string;
  itemForm: FormGroup;
  public Editor = DocumentEditor;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private projectService: ProjelerService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      summary: this.fb.control(null, [Validators.required]),
      content: this.fb.control(null, [Validators.required]),
      image: this.fb.control(null, [Validators.required]),
      imageName: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {}

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  onFileChange(event: Event) {
    const reader = new FileReader();
    this.selectedFileName = _filePathToName(
      (event.target as HTMLInputElement).value
    );
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files.length
    ) {
      const files = (event.target as HTMLInputElement).files;
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.itemForm.patchValue({
          image: (reader.result as string).split(",")[1],
          imageName: _filePathToName((event.target as HTMLInputElement).value),
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  handleSubmit() {
    if (this.itemForm.valid) {
      this.projectService
        .createNewProject(
          this.itemForm.value.title,
          this.itemForm.value.summary,
          this.itemForm.value.content,
          this.itemForm.value.image
        )
        .subscribe(
          (res) => {
            if (!res.hasError) {
              this.router.navigate(["/projects", "all-projects"]);
              this._snackBar.open("Proje Oluşturma Başarılı.", "Kapat", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
              });
            } else {
              this._snackBar.open(res.message, "Kapat", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top",
              });
            }
          },
          (err) =>
            this._snackBar.open("Beklenmedik Hata Meydana Geldi.", "Kapat", {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top",
            })
        );
    } else {
      this._snackBar.open("Geçerli Form Girmeniz Gerekmektedir.", "Kapat", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
  }
}
