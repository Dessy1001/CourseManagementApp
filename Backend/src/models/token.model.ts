const mongoose = require("mongoose");

import { Schema, Document, model } from 'mongoose';

interface IToken extends Document {
    userId: Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
}

const TokenSchema = new Schema<IToken>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const Token = model<IToken>('Token', TokenSchema);
type TokenDoc = ReturnType<(typeof Token)['hydrate']>;

export { Token, TokenDoc, IToken };