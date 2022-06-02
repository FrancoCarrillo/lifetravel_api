import { Module } from '@nestjs/common';
import { CqrsModule, QueryHandler } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsApplicationService } from "./application/services/payments-application.service";
import { PaymentsController } from "./api/payments.controller";
import { AddPaymentHandler } from "./application/handlers/commands/add-payment.handler";
import { PaymentTypeORM } from "./infrastructure/persistence/typeorm/entities/payment.typeorm";
import { AddPaymentValidator } from "./application/validators/add-payment.validator";

export const CommandHandlers = [AddPaymentHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PaymentTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsApplicationService,
    AddPaymentValidator,
    ...CommandHandlers,
  ]
})
export class PaymentsModule {}