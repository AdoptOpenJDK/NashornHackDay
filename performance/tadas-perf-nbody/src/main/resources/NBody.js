function NBody() {
    var n = 500000;
    var bodies = new NBodySystem();
//    print(bodies.energy());
    for (var i = 0; i < n; i++) {
        bodies.advance(0.01);
    }
//    print(bodies.energy());
}

function NBodySystem() {

    var bodies = [Body.sun(),
        Body.jupiter(),
        Body.saturn(),
        Body.uranus(),
        Body.neptune()];

    var px = 0.0;
    var py = 0.0;
    var pz = 0.0;
    for (var i = 0; i < bodies.length; ++i) {
        px += bodies[i].vx * bodies[i].mass;
        py += bodies[i].vy * bodies[i].mass;
        pz += bodies[i].vz * bodies[i].mass;
    }
    
    bodies[0].offsetMomentum(px, py, pz);

    this.bodies = bodies;
}


NBodySystem.prototype.energy = function() {
    var dx, dy, dz, distance;
    var e = 0.0;

    for (var i = 0; i < this.bodies.length; ++i) {
        var iBody = this.bodies[i];
        e += 0.5 * iBody.mass
                * (iBody.vx * iBody.vx
                + iBody.vy * iBody.vy
                + iBody.vz * iBody.vz);

        for (var j = i + 1; j < this.bodies.length; ++j) {
            var jBody = this.bodies[j];
            dx = iBody.x - jBody.x;
            dy = iBody.y - jBody.y;
            dz = iBody.z - jBody.z;

            distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            e -= (iBody.mass * jBody.mass) / distance;
        }
    }
    return e;
};

NBodySystem.prototype.advance = function(dt) {

    for (var i = 0; i < this.bodies.length; ++i) {
        var iBody = this.bodies[i];
        for (var j = i + 1; j < this.bodies.length; ++j) {
            var dx = iBody.x - this.bodies[j].x;
            var dy = iBody.y - this.bodies[j].y;
            var dz = iBody.z - this.bodies[j].z;

            var dSquared = dx * dx + dy * dy + dz * dz;
            var distance = Math.sqrt(dSquared);
            var mag = dt / (dSquared * distance);

            iBody.vx -= dx * this.bodies[j].mass * mag;
            iBody.vy -= dy * this.bodies[j].mass * mag;
            iBody.vz -= dz * this.bodies[j].mass * mag;

            this.bodies[j].vx += dx * iBody.mass * mag;
            this.bodies[j].vy += dy * iBody.mass * mag;
            this.bodies[j].vz += dz * iBody.mass * mag;
        }
    }

    for (var body_i = 0; body_i < this.bodies.length; body_i++) {
        var body = this.bodies[body_i];
        body.x += dt * body.vx;
        body.y += dt * body.vy;
        body.z += dt * body.vz;
    }
};

var PI = 3.141592653589793;
var SOLAR_MASS = 4 * PI * PI;
var DAYS_PER_YEAR = 365.24;

function Body() {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.vz = 0.0;
    this.mass = 0.0;
}

Body.prototype.offsetMomentum = function(px, py, pz) {
    this.vx = -px / SOLAR_MASS;
    this.vy = -py / SOLAR_MASS;
    this.vz = -pz / SOLAR_MASS;
};

Body.jupiter = function() {
    var p = new Body();
    p.x = 4.84143144246472090e+00;
    p.y = -1.16032004402742839e+00;
    p.z = -1.03622044471123109e-01;
    p.vx = 1.66007664274403694e-03 * DAYS_PER_YEAR;
    p.vy = 7.69901118419740425e-03 * DAYS_PER_YEAR;
    p.vz = -6.90460016972063023e-05 * DAYS_PER_YEAR;
    p.mass = 9.54791938424326609e-04 * SOLAR_MASS;
    return p;
};

Body.saturn = function() {
    var p = new Body();
    p.x = 8.34336671824457987e+00;
    p.y = 4.12479856412430479e+00;
    p.z = -4.03523417114321381e-01;
    p.vx = -2.76742510726862411e-03 * DAYS_PER_YEAR;
    p.vy = 4.99852801234917238e-03 * DAYS_PER_YEAR;
    p.vz = 2.30417297573763929e-05 * DAYS_PER_YEAR;
    p.mass = 2.85885980666130812e-04 * SOLAR_MASS;
    return p;
}

Body.uranus = function() {
    var p = new Body();
    p.x = 1.28943695621391310e+01;
    p.y = -1.51111514016986312e+01;
    p.z = -2.23307578892655734e-01;
    p.vx = 2.96460137564761618e-03 * DAYS_PER_YEAR;
    p.vy = 2.37847173959480950e-03 * DAYS_PER_YEAR;
    p.vz = -2.96589568540237556e-05 * DAYS_PER_YEAR;
    p.mass = 4.36624404335156298e-05 * SOLAR_MASS;
    return p;
}

Body.neptune = function() {
    var p = new Body();
    p.x = 1.53796971148509165e+01;
    p.y = -2.59193146099879641e+01;
    p.z = 1.79258772950371181e-01;
    p.vx = 2.68067772490389322e-03 * DAYS_PER_YEAR;
    p.vy = 1.62824170038242295e-03 * DAYS_PER_YEAR;
    p.vz = -9.51592254519715870e-05 * DAYS_PER_YEAR;
    p.mass = 5.15138902046611451e-05 * SOLAR_MASS;
    return p;
};

Body.sun = function() {
    var p = new Body();
    p.mass = SOLAR_MASS;
    return p;
};


NBody();