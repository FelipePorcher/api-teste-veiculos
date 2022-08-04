import { Module } from '@nestjs/common'
import { SignupModule } from './presentation/controllers/signup/signup.module'
import { MongooseModule } from '@nestjs/mongoose'
import { LoginModule } from './presentation/controllers/login/login.module'
import { VehicleModule } from './presentation/controllers/vehicle/vehicle.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:zTz3ELmuG1IfVbnn@cluster0.exnwf.mongodb.net/teste-veiculos?retryWrites=true&w=majority'),
    SignupModule,
    LoginModule,
    VehicleModule],
  controllers: [],
  providers: []
})
export class AppModule {}
