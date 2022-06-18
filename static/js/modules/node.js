function Node(id, status){

    this.id = id;
    this.status = status;
    this.previousNode = null;
    this.path = null;
    this.direction = null;
    this.storedDirection = null;
    this.distance = Infinity;
    this.totalDistance = Infinity;
    this.heuristicDistance = null;
    this.weight = 0;
    this.relatesToObject = false;
    this.overwriteObjectRelation = false;

    this.otherId = id;
    this.otherStatus = status;
    this.otherPreviousNode = null;
    this.otherPath = null;
    this.otherDirection = null;
    this.otherStoredDirection = null;
    this.otherDistance = Infinity;
    this.otherWeight = 0;
    this.otherRelatesToObject = false;
    this.otherOverwriteObjectRelation = false;
    
}

module.exports = Node;