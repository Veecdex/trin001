// ==========================
// DEFAULT STORE DATA
// ==========================

const defaultStoreProfile = {

    businessName: "Trinfelly Store",
  
    businessId: "WSL-BIZ-2026-1023",
  
    phone: "+229 61 00 00 00",
  
    email: "store@email.com",
  
    address: "Cotonou, Littoral, Benin",
  
    joined: "January 2026",
  
    logo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
  };
  
  // ==========================
  // GET STORE PROFILE
  // ==========================
  
  function getStoreProfile() {
  
    let profile =
      localStorage.getItem(
        "storeProfile"
      );
  
    if (!profile) {
  
      localStorage.setItem(
        "storeProfile",
        JSON.stringify(
          defaultStoreProfile
        )
      );
  
      return defaultStoreProfile;
    }
  
    return JSON.parse(profile);
  }
  
  // ==========================
  // SAVE STORE PROFILE
  // ==========================
  
  function saveStoreProfile(data) {
  
    localStorage.setItem(
      "storeProfile",
      JSON.stringify(data)
    );
  }
  
  // ==========================
  // RENDER STORE PROFILE
  // ==========================
  
  function renderStoreProfile() {
  
    const profile =
      getStoreProfile();
  
    // LEFT SIDE INPUTS
  
    document.getElementById(
      "businessName"
    ).value =
      profile.businessName;
  
    document.getElementById(
      "businessId"
    ).value =
      profile.businessId;
  
    document.getElementById(
      "businessPhone"
    ).value =
      profile.phone;
  
    document.getElementById(
      "businessEmail"
    ).value =
      profile.email;
  
    document.getElementById(
      "businessAddress"
    ).value =
      profile.address;
  
    document.getElementById(
      "storeLogo"
    ).src =
      profile.logo;
  
    // TOPBAR
  
    document.querySelector(
      ".leading-tight .text-sm.font-semibold"
    ).textContent =
      profile.businessName;
  
    // SIDEBAR INFO
  
    document.getElementById(
      "sidebarBusinessName"
    ).textContent =
      profile.businessName;
  
    document.getElementById(
      "sidebarBusinessId"
    ).textContent =
      profile.businessId;
  
    document.getElementById(
      "sidebarBusinessPhone"
    ).textContent =
      profile.phone;
  
    document.getElementById(
      "sidebarBusinessJoined"
    ).textContent =
      profile.joined;
  }
  
  // ==========================
  // SAVE BUTTON
  // ==========================
  
  function setupSaveProfile() {
  
    const btn =
      document.getElementById(
        "saveProfileBtn"
      );
  
    btn.addEventListener(
      "click",
      () => {
  
        const updatedProfile = {
  
          businessName:
            document.getElementById(
              "businessName"
            ).value,
  
          businessId:
            document.getElementById(
              "businessId"
            ).value,
  
          phone:
            document.getElementById(
              "businessPhone"
            ).value,
  
          email:
            document.getElementById(
              "businessEmail"
            ).value,
  
          address:
            document.getElementById(
              "businessAddress"
            ).value,
  
          joined:
            getStoreProfile().joined,
  
          logo:
            getStoreProfile().logo
        };
  
        saveStoreProfile(
          updatedProfile
        );
  
        renderStoreProfile();
  
        alert(
          "Store profile updated successfully."
        );
      }
    );
  }
  
  // ==========================
  // INIT
  // ==========================
  
  document.addEventListener(
    "DOMContentLoaded",
    () => {
  
      renderStoreProfile();
  
      setupSaveProfile();
  
      lucide.createIcons();
    }
  );