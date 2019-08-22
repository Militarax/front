import { Component, OnInit } from '@angular/core';
import { Profile, SearchProfile} from '@app/_models';
import {SearchProfileService} from '@app/_services';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  lengs = [ 'JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'C#',  'Shell',
    'Objective-C', 'Matlab', 'Arduino', 'R', 'VimL', 'Go', 'Perl', 'CoffeeScript', 'TeX', 'Swift', 'Scala', 'Emacs Lips', 'Haskell',
    'Lua', 'Clojure', 'Makefile', 'Groovy', 'Puppet', 'Rust', 'PowerShell'];
  profs: SearchProfile[];
  constructor(private searchService: SearchProfileService,
              private toastrService: ToastrService,
              private router: Router,
              private fb: FormBuilder) {this.profs = [];}

  searchFilters: FormGroup;

  ngOnInit(): void {
    this.searchFilters = this.fb.group({
      filters: this.fb.array([this.fb.group(
          {location: '', language: ''})])
    });
  }

  get searchfils() {
    return this.searchFilters.get('filters') as FormArray;
  }
  addSearchFilters() {
    this.searchfils.push(this.fb.group({
      location: '', language: ''
    }));
  }
  deleteSearchFilters(index) {
    this.searchfils.removeAt(index);
  }
  OnSubmit() {
    let prof: SearchProfile;
    for (let i = 0; i < this.searchFilters.value['filters'].length; i++) {
      if (this.searchFilters.value['filters'][i]['language'] !== '' && this.searchFilters.value['filters'][i]['location'] !== '') {
        if (this.searchFilters.value['filters'][i]['language'].length === 1) {
          if (this.searchFilters.value['filters'][i]['language'] === 'C#') {
            prof = new SearchProfile(this.searchFilters.value['filters'][i]['location'], 'C4');
          } else {
            prof = new SearchProfile(this.searchFilters.value['filters'][i]['location'],
                this.searchFilters.value['filters'][i]['language']);
          }
          this.profs.push(prof);
        } else {
          for (let q = 0; q < this.searchFilters.value['filters'][i]['language'].length; q++) {
            if (this.searchFilters.value['filters'][i]['language'][q] === 'C#') {
            prof = new SearchProfile(this.searchFilters.value['filters'][i]['location'], 'C4');
          } else {
            prof = new SearchProfile(this.searchFilters.value['filters'][i]['location'],
                this.searchFilters.value['filters'][i]['language'][q]);
          }
          this.profs.push(prof);
          }
        }
      }
    }
    this.searchService.PostSearchCriteria(this.profs).then(
        profile => { console.log(profile);
        this.toastrService.warning('The search have begun. Check the Profiles');
        });
    this.profs = [];
  }
}
