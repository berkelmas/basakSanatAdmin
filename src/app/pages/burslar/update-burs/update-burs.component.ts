import { Component, OnInit } from "@angular/core";
import * as CKEditor from "@ckeditor/ckeditor5-angular";
import * as DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import "@ckeditor/ckeditor5-build-decoupled-document/build/translations/tr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BursService } from "../../../services/burslar/burs.service";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { map, concatMap } from "rxjs/operators";
import { IBurs } from "../../../models/burslar/burs.model";

@Component({
  selector: "app-update-burs",
  templateUrl: "./update-burs.component.html",
  styleUrls: ["./update-burs.component.css"]
})
export class UpdateBursComponent implements OnInit {
  public Editor = DocumentEditor;
  public itemForm: FormGroup;
  public burs: IBurs;

  constructor(
    private fb: FormBuilder,
    private bursService: BursService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      summary: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map(res => res.id),
        concatMap(id => this.bursService.getBursById(id)),
        map(res => res.result)
      )
      .subscribe(burs => {
        this.burs = burs;
        this.itemForm.patchValue({
          title: burs.title,
          summary: burs.summary,
          description: burs.description
        });
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

  handleSubmit() {
    if (this.itemForm.valid) {
      this.bursService
        .updateBurs(
          this.burs.id,
          this.itemForm.value.title,
          this.itemForm.value.summary,
          this.itemForm.value.description
        )
        .subscribe(
          res => {
            if (!res.hasError) {
              this.router.navigate(["/scholarships", "all-scholarships"]);
              this._snackBar.open("Burs Güncellemesi Başarılı.", "Kapat", {
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
