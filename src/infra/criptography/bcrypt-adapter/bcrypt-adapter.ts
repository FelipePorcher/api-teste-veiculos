import { Hasher } from '@/data/protocols/criptography/hasher'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    const digest = await bcrypt.hash(plaintext, this.salt)
    return digest
  }
}
