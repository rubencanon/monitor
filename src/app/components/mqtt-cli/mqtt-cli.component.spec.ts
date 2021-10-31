import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttCliComponent } from './mqtt-cli.component';

describe('MqttCliComponent', () => {
  let component: MqttCliComponent;
  let fixture: ComponentFixture<MqttCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttCliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
