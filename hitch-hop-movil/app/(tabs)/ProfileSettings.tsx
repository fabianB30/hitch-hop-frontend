import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input, InputField, InputSlot, InputError } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal"
import { useRouter } from "expo-router";
import { Camera } from "lucide-react-native";
import { ChevronLeft } from "lucide-react-native";
import { Info } from "lucide-react-native";
import { Select, SelectError } from "@/components/ui/select";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Eye, EyeOff } from "lucide-react-native";
import { updateUserRequest, User } from '../../interconnection/user';
import { useAuth } from './Context/auth-context';
import { getParameterByNameRequest } from '../../interconnection/paremeter';
import { getAllInstitutionsRequest } from '../../interconnection/institution';
const ImagenBG = require("/assets/images/1.5-BG_ProfileSettings.png");
//const ImagenPFP = require("../../../assets/images/1.5-DefaultPFP.png");


// Esquema real de la base de datos, se los dejo como referencia
/*export type User = {
  name: string;
  username: string;
  email: string;
  password: string;
  institutionId: string;
  identificationTypeId?: "Cedula" | "DIMEX" | "Pasaporte";
  identificationNumber?: number;
  birthDate: string;
  genre?: "Masculino" | "Femenino" | "Otro";
  photoKey?: string;
  photoUrl?: string;
  type: "Administrador" | "Usuario" | "Inactivo - Admin" | "Inactivo - User";
  role: "Conductor" | "Pasajero";
  vehicles: string[]; // array id
  notifications: {
    title: string;
    subtitle: string;
    timestamp?: string;
  }[];
};*/

// Esto era de ustedes, pueden eliminarlo
/*type User = {
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  institucion: string;
  identificationTypeId: string;
  identificationNumber: string;
  birthDate: string;
  phone: string;
  genre: string;
  username: string;
  type: string;
  photoKey: string | null;
};*/

/*const initialUser: User = {
  name: "Juan",
  firstSurname: "Rodríguez",
  secondSurname: "Chaves",
  email: "juan@estudiantec.cr",
  institucion: "Tecnológico de Costa Rica",
  identificationTypeId: "Cédula",
  identificationNumber: "116032348",
  birthDate: "27 / 02 / 2003",
  phone: "83017776",
  genre: "Masculino",
  username: "juanRC02",
  type: "Administrador",
  photoKey: null,
};*/

//const tiposId = ["Cédula", "DIMEX", "Pasaporte"];
//const instituciones = ["Tecnológico de Costa Rica"];
const genres = ["Masculino", "Femenino", "Otro"];
const tiposUsuario = ["Administrador", "Usuario"];

export default function ProfileSettings() {
  const [tiposId, setTiposId] = useState<string[]>([]);
  const [instituciones, setInstituciones] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        const param = await getParameterByNameRequest("Tipo de identificación");
        const resInstitutions = await getAllInstitutionsRequest();
        if (param) setTiposId(param.parameterList);
        if (resInstitutions) setInstituciones(resInstitutions);
      } catch (error) {
        console.error("Error al obtener opciones:", error);
      }
    }

    fetchData();
  }, []);

  const institucionOptions = instituciones.map(inst => ({
    label: inst.nombre,
    value: inst._id
  }));

  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState(user);
  const [backupData, setBackupData] = useState(user);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const validateUserData = (data: typeof initialUser) => {
  const errors: Record<string, string> = {};
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (!nameRegex.test(data.name)) errors.name = "El name solo puede contener letras.";
  if (!nameRegex.test(data.firstSurname)) errors.firstSurname = "El primer apellido solo puede contener letras.";
  if (!nameRegex.test(data.secondSurname)) errors.secondSurname = "El segundo apellido solo puede contener letras.";
  if (!/^\d{9}$/.test(String(data.identificationNumber))) errors.identificationNumber = "El número de ID debe tener 9 dígitos.";
  if (!/^\d{8}$/.test(String(data.phone))) errors.phone = "El teléfono debe tener 8 dígitos.";
  if (!/^.+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(data.email)) {
    errors.email = "El email debe terminar en @itcr.ac.cr o @estudiantec.cr.";
  }

  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
 };

  const toggleEdit = () => {
  if (!editable) {
    //const userUpdate = await updateUserRequest(user.id, user);
    setBackupData(userData);
    setEditable(true);
  
  } else {
    const isValid = validateUserData(userData);
    if (!isValid) {
      return;
    }
    setEditable(false);
    setFieldErrors({});
  }
};

  const cancelEdit = () => {
    setUserData(backupData);
    setEditable(false);
    setFieldErrors({});
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleEditPhoto = async () => {
  // Pide permisos si es necesario
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Se requieren permisos para acceder a tus photoKeys.');
    return;
  }

  // Abre la galería
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setUserData({ ...userData, photoKey: result.assets[0].uri });
  }
};
 // Convierte la fecha de nacimiento a objeto Date
  const getDateFromString = (dateStr: string) => {
    const [day, month, year] = dateStr.split(" / ").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = `${selectedDate.getDate().toString().padStart(2, "0")} / ${(selectedDate.getMonth() + 1).toString().padStart(2, "0")} / ${selectedDate.getFullYear()}`;
      setUserData({ ...userData, birthDate: formatted });
    }
  };


const handleChangePassword = () => {
  let hasError = false;
  setCurrentPasswordError(false);
  setNewPasswordError(false);
  setConfirmPasswordError(false);

  // mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula y 1 número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!currentPassword) {
    setCurrentPasswordError(true);
    hasError = true;
  }
  if (!passwordRegex.test(newPassword)) {
    setNewPasswordError(true);
    hasError = true;
  }
  if (newPassword !== confirmPassword) {
    setConfirmPasswordError(true);
    hasError = true;
  }
  if (hasError) return;

  setShowPasswordModal(false);
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen de fondo superior */}
      <View style={styles.backgroundContainer}>  
        <Image source={ImagenBG} style={styles.backgroundImage} resizeMode="cover" />
        <Text style={styles.hitchHopText}>HitchHop</Text>
     </View>
      {/* Recuadro principal con la información */}
      <View style={styles.profileCard}>
        {/* Botón de regresar arriba*/}
        <TouchableOpacity
          style={styles.backBtnAbsolute}
          onPress={() => {
            // Navegar a pantalla principal
          }}
        >
          <ChevronLeft color="black" size={35} />
        </TouchableOpacity>
        {/* Avatar centrado */}
        <View style={styles.avatarContainerCentered}>
          <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={
                userData.photoKey
                  ? { uri: userData.photoKey }
                  : require("@/assets/images/iconPrimary.png")
              }
              style={styles.avatar}
            />
            {editable && (
              <TouchableOpacity
                style={styles.editPhotoIconBtn}
                onPress={handleEditPhoto}
                activeOpacity={0.7}
              >
                <Camera color="black" size={22} />
              </TouchableOpacity>
            )}
          </View>
          {editable && (
            <TouchableOpacity
              style={styles.editPhotoBtn}
              onPress={() => setShowPasswordModal(true)}
            >
              <Text style={styles.editPhotoText}>Cambiar contraseña</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Botón de editar/guardar y cancelar*/}
        {editable ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={toggleEdit}>
              <Text style={styles.saveBtnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonRowCenter}>
            <TouchableOpacity style={styles.saveBtn} onPress={toggleEdit}>
              <Text style={styles.saveBtnText}>Editar información</Text>
            </TouchableOpacity>
          </View>
        )}

      <View style={styles.formSection}>
        <ProfileInput label="name de usuario" value={userData.username} editable={editable} onChange={v => handleChange("username", v)} />
        <ProfileInput label="name" value={userData.name} editable={editable} onChange={v => handleChange("name", v)} error={fieldErrors.name} />
        <ProfileInput label="Primer Apellido" value={userData.firstSurname} editable={editable} onChange={v => handleChange("firstSurname", v)} error={fieldErrors.firstSurname} />
        <ProfileInput label="Segundo Apellido" value={userData.secondSurname} editable={editable} onChange={v => handleChange("secondSurname", v)} error={fieldErrors.secondSurname} />
        <ProfileInput label="email institucional" value={userData.email} editable={editable} onChange={v => handleChange("email", v)} error={fieldErrors.email} />
        <ProfileInput label="Teléfono" value={String(userData.phone)} editable={editable} onChange={v => handleChange("phone", Number(v))} error={fieldErrors.phone} />
        <ProfileInput label="Tipo de ID" value={userData.identificationTypeId} editable={editable} onChange={v => handleChange("identificationTypeId", v)} options={tiposId} />
        <ProfileInput label="Número de ID" value={String(userData.identificationNumber)} editable={editable} onChange={v => handleChange("identificationNumber", Number(v))} error={fieldErrors.identificationNumber} />
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
          <TouchableOpacity
            onPress={() => editable && setShowDatePicker(true)}
            disabled={!editable}
            activeOpacity={editable ? 0.7 : 1}
          >
            <Input
              isDisabled={!editable}
              isInvalid={!!fieldErrors.birthDate}
              style={{ backgroundColor: "#fff" }}
              pointerEvents="none"
            >
              <InputField
                value={userData.birthDate || ""}
                placeholder="Selecciona una fecha"
                editable={false} // No editable, solo abre el picker
                pointerEvents="none"
                style={{ color: userData.birthDate ? "#222" : "#888" }}
              />
            </Input>
          </TouchableOpacity>
          {fieldErrors.birthDate && (
            <InputError>{fieldErrors.birthDate}</InputError>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={getDateFromString(userData.birthDate)}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
        <ProfileInput label="Institución" value={institucionOptions.find(opt => opt.value === userData.institutionId)?.label || ""} editable={editable} onChange={v => handleChange("institucion", v)} options={institucionOptions} />
        <ProfileInput label="Tipo de usuario" value={userData.type} editable={editable} onChange={v => handleChange("type", v)} options={tiposUsuario} />
        <ProfileInput label="Género" value={userData.genre} editable={editable} onChange={v => handleChange("genre", v)} options={genres} />
      </View>
    </View>
    {/* Modal para cambiar contraseña */}
    <Modal
      isOpen={showPasswordModal}
      onClose={() => setShowPasswordModal(false)}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
          <ModalCloseButton onPress={() => setShowPasswordModal(false)} />
        </ModalHeader>
        <ModalBody>
          <Input isInvalid={currentPasswordError} style={{ marginBottom: 4 }}>
            <InputField
              placeholder="Contraseña actual"
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={{ paddingRight: 36 }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 8 }}
              onPress={() => setShowCurrentPassword((v) => !v)}
              hitSlop={10}
            >
              {showCurrentPassword ? (
                <EyeOff size={20} color="#888" />
              ) : (
                <Eye size={20} color="#888" />
              )}
            </TouchableOpacity>
          </Input>
          {currentPasswordError && (
            <InputError>Debes ingresar tu contraseña actual.</InputError>
          )}

          <Input isInvalid={newPasswordError} style={{ marginBottom: 4 }}>
            <InputField
              placeholder="Contraseña nueva"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={{ paddingRight: 36 }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 8 }}
              onPress={() => setShowNewPassword((v) => !v)}
              hitSlop={10}
            >
              {showNewPassword ? (
                <EyeOff size={20} color="#888" />
              ) : (
                <Eye size={20} color="#888" />
              )}
            </TouchableOpacity>
          </Input>
          {newPasswordError && (
            <InputError>La contraseña no cumple los requisitos</InputError>
          )}

          <Input isInvalid={confirmPasswordError} style={{ marginBottom: 0 }}>
            <InputField
              placeholder="Confirmar contraseña"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{ paddingRight: 36 }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 8 }}
              onPress={() => setShowConfirmPassword((v) => !v)}
              hitSlop={10}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color="#888" />
              ) : (
                <Eye size={20} color="#888" />
              )}
            </TouchableOpacity>
          </Input>
          {confirmPasswordError && (
            <InputError>Las contraseñas no coinciden.</InputError>
          )}

          {/* Formato esperado de la contraseña */}
          <View
            style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
              padding: 12,
              marginTop: 16,
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
          <Info color="#787878" size={20} style={{ marginTop: 2 }} />
          <Text style={{ color: "#444", fontSize: 14, flex: 1 }}>
            Mínimo 8 caracteres, con al menos{"\n"}
            1 letra mayúscula, 1 letra minúscula, y 1 número.
          </Text>
        </View>
        </ModalBody>
        <ModalFooter>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => {
              setShowPasswordModal(false);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setCurrentPasswordError(false);
              setNewPasswordError(false);
              setConfirmPasswordError(false);
              setShowCurrentPassword(false);
              setShowNewPassword(false);          
              setShowConfirmPassword(false);
            }}>
            <Text style={styles.cancelBtnText}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={() => {
              handleChangePassword();
              setShowCurrentPassword(false);   
              setShowNewPassword(false);          
              setShowConfirmPassword(false);     
            }}>
            <Text style={styles.saveBtnText}>Confirmar</Text>
          </TouchableOpacity>
        </ModalFooter>
      </ModalContent>
    </Modal>
        </ScrollView>
      );
    }

function ProfileInput({
  label,
  value,
  editable,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  options?: string[];
  error?: string;
}) {

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      {options ? (
        <>
          <Select
            selectedValue={value}
            onValueChange={onChange!}
            options={options}
            isDisabled={!editable}
            isInvalid={!!error}
          />
          {error && <SelectError>{error}</SelectError>}
        </>
      ) : (
        <>
          <Input isInvalid={!!error} isDisabled={!editable}>
            <InputField
              value={value}
              onChangeText={onChange}
              editable={editable}
            />
          </Input>
          {error && <InputError>{error}</InputError>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 70,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  backgroundContainer: {
    width: "100%",
    height: 120,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  hitchHopText: {
    position: "absolute",
    top: 15,
    right: 7,
    zIndex: 3,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
    fontFamily: "Exo",
    textShadowColor: "#7875F8", // Color del borde
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backgroundImage: {
    width: "100%",
    height: 350,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  backBtnAbsolute: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 2,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
  avatarContainerCentered: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
    marginTop: -70,
  },
    editPhotoIconBtn: {
    position: "absolute",
    bottom: 8,
    right: -5,
    backgroundColor: "#FFAB00",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 10,
  },
  backBtnText: {
    fontSize: 22,
    color: "#7875F8",
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginTop: -60, // Para que suba sobre la imagen
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ECECFF",
    marginBottom: 12,
  },
  editPhotoBtn: {
    backgroundColor: "#FFAB00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  editPhotoText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Exo",
  },
  formSection: {
    width: "100%",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Exo",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ECECFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#white",
  },
  inputDisabled: {
    backgroundColor: "#ECECFF",
    color: "#888",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ECECFF",
    borderRadius: 8,
    backgroundColor: "#ECECFF",
    padding: 10,
  },
  buttonRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
    marginTop: -15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#7875F8",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelBtnText: {
    color: "#7875F8",
    fontWeight: "bold",
  },
  saveBtn: {
    backgroundColor: "#7875F8",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    maxWidth: 350,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});