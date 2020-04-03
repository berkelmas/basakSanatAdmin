import { Component, OnInit } from "@angular/core";
import * as CKEditor from "@ckeditor/ckeditor5-angular";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/tr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BursService } from "../../../services/burslar/burs.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-burs",
  templateUrl: "./create-burs.component.html",
  styleUrls: ["./create-burs.component.css"]
})
export class CreateBursComponent implements OnInit {
  public Editor = DocumentEditor;
  public itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bursService: BursService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      summary: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required])
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

  handleSubmit() {
    if (this.itemForm.valid) {
      this.bursService
        .createNewBurs(
          this.itemForm.value.title,
          this.itemForm.value.summary,
          this.itemForm.value.description
        )
        .subscribe(
          res => {
            if (!res.hasError) {
              this.router.navigate(["/scholarships", "all-scholarships"]);
              this._snackBar.open("Burs Oluşturma Başarılı.", "Kapat", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top"
              });
            } else {
              this._snackBar.open(res.message, "Kapat", {
                duration: 2000,
                horizontalPosition: "right",
                verticalPosition: "top"
              });
            }
          },
          err =>
            this._snackBar.open("Beklenmedik Hata Meydana Geldi.", "Kapat", {
              duration: 2000,
              horizontalPosition: "right",
              verticalPosition: "top"
            })
        );
    } else {
      this._snackBar.open("Geçerli Form Girmeniz Gerekmektedir.", "Kapat", {
        duration: 2000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
    }
  }
}
