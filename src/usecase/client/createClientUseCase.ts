import { BadRequestError } from "@/error/badRequest.error";
import { ClientRepository } from "@/repository/clientRepository";
import { CompanyRepository } from "@/repository/companyRepository";
import { GetLatLonByAddress } from "@/service/getLatLonByAddress";

export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  // verificar lon e lat automaticamente se não for informado

  async execute({
    name,
    email,
    lat,
    lon,
    phoneNumber,
    zipCode,
    responsiblePerson,
    address,
    companyId,
  }: {
    name: string;
    email: string | null;
    lon: string | null;
    lat: string | null;
    phoneNumber: string | null;
    zipCode: string | null;
    responsiblePerson: string | null;
    companyId: string;
    address: string | null;
  }) {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new BadRequestError("Empresa não existe.");
    }

    if (email) {
      const clientEmail = await this.clientRepository.getByEmail(email);
      if (clientEmail) {
        throw new BadRequestError(
          "Já existe um cliente cadastrado com este e-mail."
        );
      }
    }

    const clientName = await this.clientRepository.getByName(name);
    if (clientName) {
      throw new BadRequestError(
        "Já existe um cliente cadastrado com este nome."
      );
    }

    let latGoogle: string | undefined;
    let lonGoogle: string | undefined;

    if (address && (!lat || !lon)) {
      const resultLatLon = await GetLatLonByAddress(address);
      latGoogle = resultLatLon.lat;
      lonGoogle = resultLatLon.lon;
    }

    const client = await this.clientRepository.create({
      name,
      email,
      lon: lon ?? lonGoogle ?? null,
      lat: lat ?? latGoogle ?? null,
      phoneNumber,
      zipCode,
      Company: { connect: { id: companyId } },
      responsiblePerson,
      address: address?? null,
    });

    return { client };
  }
}
