import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Battler from "../../../GameSystems/BattleSystem/Battler";
import Healthpack from "../../../GameSystems/ItemSystem/Items/Healthpack";
import { TargetableEntity } from "../../../GameSystems/Targeting/TargetableEntity";
import NPCActor from "../../../Actors/NPCActor";
import NPCBehavior from "../NPCBehavior";
import NPCAction from "./NPCAction";
import Finder from "../../../GameSystems/Searching/Finder";


export default class UseHealthpack extends NPCAction {
    
    // The targeting strategy used for this GotoAction - determines how the target is selected basically
    protected override _targetFinder: Finder<Battler>;
    // The targets or Targetable entities 
    protected override _targets: Battler[];
    // The target we are going to set the actor to target
    protected override _target: Battler | null;

    protected healthpack: Healthpack | null;

    public constructor(parent: NPCBehavior, actor: NPCActor) { 
        super(parent, actor);
    }

    public performAction(target: Battler): void {
        if (this.actor.inventory != null) {
            this.actor.inventory.remove(this.healthpack.id);
        }
        // Finish the action
        this.finished();
    }

    public onEnter(options: Record<string, any>): void {
        super.onEnter(options);
        // Find a lasergun in the actors inventory
        let healthpack = this.actor.inventory.find(item => item.constructor === Healthpack);
        if (healthpack !== null && healthpack.constructor === Healthpack) {
            this.healthpack = healthpack;
        }
    }

    public get targetFinder(): Finder<Battler> { return this._targetFinder; }
    public set targetFinder(finder: Finder<Battler>) { this._targetFinder = finder; }

    public get targets(): Array<Battler> { return this._targets; }
    public set targets(targets: Array<Battler>) { this._targets = targets; }

    public get target(): Battler | null { return this._target; }
    protected set target(target: Battler | null) { this._target = target; }


}