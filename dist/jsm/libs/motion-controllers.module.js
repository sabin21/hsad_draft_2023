const Constants={Handedness:Object.freeze({NONE:"none",LEFT:"left",RIGHT:"right"}),ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function fetchJsonFile(t){const e=await fetch(t);if(e.ok)return e.json();throw new Error(e.statusText)}async function fetchProfilesList(t){if(!t)throw new Error("No basePath supplied");return await fetchJsonFile(`${t}/profilesList.json`)}async function fetchProfile(t,e,s=null,o=!0){if(!t)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No basePath supplied");const a=await fetchProfilesList(e);let n;if(t.profiles.some((t=>{const s=a[t];return s&&(n={profileId:t,profilePath:`${e}/${s.path}`,deprecated:!!s.deprecated}),!!n})),!n){if(!s)throw new Error("No matching profile name found");const t=a[s];if(!t)throw new Error(`No matching profile name found and default profile "${s}" missing.`);n={profileId:s,profilePath:`${e}/${t.path}`,deprecated:!!t.deprecated}}const i=await fetchJsonFile(n.profilePath);let r;if(o){let e;if(e="any"===t.handedness?i.layouts[Object.keys(i.layouts)[0]]:i.layouts[t.handedness],!e)throw new Error(`No matching handedness, ${t.handedness}, in profile ${n.profileId}`);e.assetPath&&(r=n.profilePath.replace("profile.json",e.assetPath))}return{profile:i,assetPath:r}}const defaultComponentValues={xAxis:0,yAxis:0,button:0,state:Constants.ComponentState.DEFAULT};function normalizeAxes(t=0,e=0){let s=t,o=e;if(Math.sqrt(t*t+e*e)>1){const a=Math.atan2(e,t);s=Math.cos(a),o=Math.sin(a)}return{normalizedXAxis:.5*s+.5,normalizedYAxis:.5*o+.5}}class VisualResponse{constructor(t){this.componentProperty=t.componentProperty,this.states=t.states,this.valueNodeName=t.valueNodeName,this.valueNodeProperty=t.valueNodeProperty,this.valueNodeProperty===Constants.VisualResponseProperty.TRANSFORM&&(this.minNodeName=t.minNodeName,this.maxNodeName=t.maxNodeName),this.value=0,this.updateFromComponent(defaultComponentValues)}updateFromComponent({xAxis:t,yAxis:e,button:s,state:o}){const{normalizedXAxis:a,normalizedYAxis:n}=normalizeAxes(t,e);switch(this.componentProperty){case Constants.ComponentProperty.X_AXIS:this.value=this.states.includes(o)?a:.5;break;case Constants.ComponentProperty.Y_AXIS:this.value=this.states.includes(o)?n:.5;break;case Constants.ComponentProperty.BUTTON:this.value=this.states.includes(o)?s:0;break;case Constants.ComponentProperty.STATE:this.valueNodeProperty===Constants.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(o):this.value=this.states.includes(o)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class Component{constructor(t,e){if(!(t&&e&&e.visualResponses&&e.gamepadIndices&&0!==Object.keys(e.gamepadIndices).length))throw new Error("Invalid arguments supplied");this.id=t,this.type=e.type,this.rootNodeName=e.rootNodeName,this.touchPointNodeName=e.touchPointNodeName,this.visualResponses={},Object.keys(e.visualResponses).forEach((t=>{const s=new VisualResponse(e.visualResponses[t]);this.visualResponses[t]=s})),this.gamepadIndices=Object.assign({},e.gamepadIndices),this.values={state:Constants.ComponentState.DEFAULT,button:void 0!==this.gamepadIndices.button?0:void 0,xAxis:void 0!==this.gamepadIndices.xAxis?0:void 0,yAxis:void 0!==this.gamepadIndices.yAxis?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(t){if(this.values.state=Constants.ComponentState.DEFAULT,void 0!==this.gamepadIndices.button&&t.buttons.length>this.gamepadIndices.button){const e=t.buttons[this.gamepadIndices.button];this.values.button=e.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,e.pressed||1===this.values.button?this.values.state=Constants.ComponentState.PRESSED:(e.touched||this.values.button>Constants.ButtonTouchThreshold)&&(this.values.state=Constants.ComponentState.TOUCHED)}void 0!==this.gamepadIndices.xAxis&&t.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=t.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===Constants.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>Constants.AxisTouchThreshold&&(this.values.state=Constants.ComponentState.TOUCHED)),void 0!==this.gamepadIndices.yAxis&&t.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=t.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===Constants.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>Constants.AxisTouchThreshold&&(this.values.state=Constants.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach((t=>{t.updateFromComponent(this.values)}))}}class MotionController{constructor(t,e,s){if(!t)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No profile supplied");this.xrInputSource=t,this.assetUrl=s,this.id=e.profileId,this.layoutDescription=e.layouts[t.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach((t=>{const e=this.layoutDescription.components[t];this.components[t]=new Component(t,e)})),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const t=[];return Object.values(this.components).forEach((e=>{t.push(e.data)})),t}updateFromGamepad(){Object.values(this.components).forEach((t=>{t.updateFromGamepad(this.xrInputSource.gamepad)}))}}export{Constants,MotionController,fetchProfile,fetchProfilesList};