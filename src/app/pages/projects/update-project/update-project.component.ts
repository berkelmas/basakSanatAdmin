import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import * as CKEditor from "@ckeditor/ckeditor5-angular";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/tr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProjelerService } from "../../../services/projeler/projeler.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { IProje } from "../../../models/projeler/projeler.model";
import { map, concatMap } from "rxjs/operators";

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
  selector: "app-update-project",
  templateUrl: "./update-project.component.html",
  styleUrls: ["./update-project.component.css"],
})
export class UpdateProjectComponent implements OnInit {
  selectedFileName: string;
  itemForm: FormGroup;
  public Editor = DocumentEditor;
  project: IProje;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private projectService: ProjelerService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      summary: this.fb.control(null, [Validators.required]),
      content: this.fb.control(null, [Validators.required]),
      image: this.fb.control(null),
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map((res) => res.id),
        concatMap((id) => this.projectService.getProjectById(id)),
        map((res) => res.result)
      )
      .subscribe((proje) => {
        this.project = proje;
        this.itemForm.patchValue({
          title: proje.title,
          summary: proje.summary,
          content: proje.content,
        });
        this.selectedFileName = "Resmi Değiştir";
      });
  }

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
        .updateProject(
          this.project.id,
          this.itemForm.value.title,
          this.itemForm.value.summary,
          this.itemForm.value.content,
          this.itemForm.value.image
        )
        .subscribe(
          (res) => {
            if (!res.hasError) {
              this.router.navigate(["/projects", "all-projects"]);
              this._snackBar.open("Proje Düzenlemesi Başarılı.", "Kapat", {
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
