import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-building-one',
  templateUrl: './building-one.component.html',
  styleUrls: ['./building-one.component.css']
})
export class BuildingOneComponent implements OnInit, OnDestroy {
  public receivedTemp: string[] = [];
  public receivedLight: string[] = [];
  private topicTempSubscription: Subscription;
  private topicLightSubscription: Subscription;
  public temperature: string;
  public Tmessage: string;
  public brightness: string;
  public Lmessage: string;
  public tempActuatorOn: boolean = false;
  public lightActuatorOn: boolean = false;

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {
    this.topicTempSubscription = this.rxStompService.watch('/topic/B1_Temperature').subscribe((Tmessage: Message) => {
      this.receivedTemp.push(Tmessage.body);
      this.temperature = Tmessage.body;
      this.onChangeTemp()
    });
    this.topicLightSubscription = this.rxStompService.watch('/topic/B1_Brightness').subscribe((Lmessage: Message) => {
      this.receivedLight.push(Lmessage.body);
      this.brightness = Lmessage.body;
      this.onChangeBright()
    });
  }

  ngOnDestroy() {
    this.topicTempSubscription.unsubscribe()
    this.topicLightSubscription.unsubscribe()
  }

  onTurnOnHeat() {
    const message = `UP`;
    this.rxStompService.publish({ destination: '/topic/B1_Temp_Actuator', body: message });
  }

  onTurnOnFreeze() {
    const message = `DOWN`;
    this.rxStompService.publish({ destination: '/topic/B1_Temp_Actuator', body: message });
  }

  onChangeTemp() {
    console.log("TEMPERATURA: " + this.temperature)
    var t = +this.temperature
    if (!this.tempActuatorOn) {
      if (t > 24) {
        this.Tmessage = "Bajando temperatura..."
        let i = 0;
        this.tempActuatorOn = true;
        let interval = setInterval(() => {
          if (i > 3) {
            clearInterval(interval);
            this.tempActuatorOn = false;
          }
          i++;
          console.log(i)
          this.onTurnOnFreeze()
        }, 3000)

      } else if (t < 18) {
        this.Tmessage = "Subiendo temperatura...";
        let i = 0;
        this.tempActuatorOn = true;
        let interval = setInterval(() => {
          if (i > 3) {
            clearInterval(interval);
            this.tempActuatorOn = false;
          }
          i++;
          console.log(i)
          this.onTurnOnHeat()
        }, 3000)
      } else {
        this.Tmessage = "";
      }
    }
  }

  onTurnOnLights() {
    const message = `UP`;
    this.rxStompService.publish({ destination: '/topic/B1_Light_Actuator', body: message });
  }

  onTurnOffLights() {
    const message = `DOWN`;
    this.rxStompService.publish({ destination: '/topic/B1_Light_Actuator', body: message });
  }

  onChangeBright() {
    console.log("LUMINOSIDAD: " + this.brightness)
    var l = +this.brightness
    if (!this.lightActuatorOn) {
      if (l > 800) {
        this.Lmessage = "Bajando luminosidad..."
        let i = 0;
        this.lightActuatorOn = true;
        let interval1 = setInterval(() => {
          if (i > 3) {
            clearInterval(interval1);
            this.lightActuatorOn = false;
          }
          i++;
          console.log(i)
          this.onTurnOffLights()
        }, 3000)

      } else if (l < 500) {
        this.Lmessage = "Subiendo luminosidad..."
        let i = 0;
        this.lightActuatorOn = true;
        let interval = setInterval(() => {
          if (i > 3) {
            clearInterval(interval);
            this.lightActuatorOn = false;
          }
          i++;
          console.log(i)
          this.onTurnOnLights()
        }, 3000)
      } else {
        this.Lmessage = ""
      }
    }
  }
}
