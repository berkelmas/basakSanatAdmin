import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./store/reducers/index.reducer";
import { VerifyLoginAction } from "./store/actions/user.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const userItems = localStorage.getItem("user");
    this.store.dispatch(
      new VerifyLoginAction({
        localStorageUserItem: userItems,
        currentPath: "deneme"
      })
    );
  }
}
