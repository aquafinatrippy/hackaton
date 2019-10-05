export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx, fill, stroke) {
        ctx.clearRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke || fill;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export class Wall {
    constructor(width = 0, height = 0, thickness = 0) {
        this.width = width;
        this.height = height;
        this.thickness = thickness;

        this.windows = [];
        this.doors = [];
    }

    getArea() {
        return this.thickness * this.height * this.width;
    }

    addWindow(width, height, dstFromLeft, dstFromFloor) {
        this.windows.push(
            new Window(this, +width, +height, +dstFromLeft, +dstFromFloor)
        );
    }

    addDoor(width, height, dstFromLeft) {
        this.doors.push(new Door(this, +width, +height, +dstFromLeft));
    }

    calculateBounds(canvas) {
        const padding = 20;

        const canvasWidth = canvas.width - 2 * padding;
        const canvasHeight = canvas.height - 2 * padding;
        const width = this.width;
        const height = this.height;

        let stretchWidth = (canvasHeight * width) / height;
        let stretchHeight = (canvasWidth * height) / width;

        if (stretchWidth > canvasWidth) {
            stretchWidth = canvasWidth;
            stretchHeight = (stretchWidth * height) / width;
        } else {
            stretchHeight = canvasHeight;
            stretchWidth = (stretchHeight * width) / height;
        }

        const x = (canvas.width - stretchWidth) / 2;
        const y = (canvas.height - stretchHeight) / 2;

        this.bounds = new Rectangle(x, y, stretchWidth, stretchHeight);

        return this.bounds;
    }

    renderToCanvas(canvas, ctx, fill, stroke) {
        const bounds = this.calculateBounds(canvas);

        bounds.draw(ctx, fill, stroke);

        for (let window of this.windows) {
            window
                .getBounds()
                .draw(ctx, "rgba(200, 0, 0, 0.25)", "rgb(200,0,0)");
        }

        for (let door of this.doors) {
            door.getBounds().draw(ctx, "rgba(0, 0, 200, 0.25)", "rgb(0,0,200)");
        }
    }
}

export class Window {
    constructor(wall, width, height, dstFromLeft, dstFromFloor) {
        this.wall = wall;
        this.width = width;
        this.height = height;
        this.dstFromLeft = dstFromLeft;
        this.dstFromFloor = dstFromFloor;
    }

    getBounds() {
        const wallBounds = this.wall.bounds;
        const ratio = wallBounds.width / this.wall.width;

        return new Rectangle(
            wallBounds.x + this.dstFromLeft * ratio,
            wallBounds.y +
                (this.wall.height - this.dstFromFloor - this.height) * ratio,
            this.width * ratio,
            this.height * ratio
        );
    }

    toString() {
        const x = this.dstFromLeft;
        const y = this.dstFromFloor;
        const w = this.width;
        const h = this.height;

        return `Window: [${w}m]x[${h}m] ${x}m from left, ${y}m from floor]`;
    }
}

export class Door {
    constructor(wall, width, height, dstFromLeft) {
        this.wall = wall;
        this.width = width;
        this.height = height;
        this.dstFromLeft = dstFromLeft;
    }

    getBounds() {
        const wallBounds = this.wall.bounds;
        const ratio = wallBounds.width / this.wall.width;

        return new Rectangle(
            wallBounds.x + this.dstFromLeft * ratio,
            wallBounds.y + (this.wall.height - this.height) * ratio,
            this.width * ratio,
            this.height * ratio
        );
    }

    toString() {
        const x = this.dstFromLeft;
        const w = this.width;
        const h = this.height;

        return `Door: [${w}m]x[${h}m] ${x}m from left`;
    }
}
