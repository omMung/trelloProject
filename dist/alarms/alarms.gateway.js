"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let AlarmsGateway = class AlarmsGateway {
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            client.join(`user-${userId}`);
            console.log(`User ${userId} connected to WebSocket`);
        }
    }
    handleDisconnect(client) {
        console.log(`User disconnected: ${client.id}`);
    }
};
exports.AlarmsGateway = AlarmsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AlarmsGateway.prototype, "server", void 0);
exports.AlarmsGateway = AlarmsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: 'https://www.yangs.site', credentials: true },
    })
], AlarmsGateway);
//# sourceMappingURL=alarms.gateway.js.map